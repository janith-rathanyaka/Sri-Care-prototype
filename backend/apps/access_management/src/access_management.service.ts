import { MongoRepository } from '@app/database/repository/mongo.repository';
import { CreateUserDto } from '@app/shared/dtos/create-user.dto';
import { User } from '@app/shared/schemas/user.schema';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VAS } from '@app/shared/schemas/vas.schema'; // Add this line to import VAS
import * as bcrypt from 'bcrypt';
import { ProvisioningSystemService } from '@app/provisioning_system';
import { OtpGenerateService } from '@app/otp-generate';
import { NotificationsService } from '@app/notifications';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessManagementService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: MongoRepository<User>,
    private readonly otpGenerateService: OtpGenerateService,
    private readonly provisioningSystemService: ProvisioningSystemService,
    private readonly notificationService: NotificationsService,
    @Inject('VASRepository')
    private readonly VASRepository: MongoRepository<VAS>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { mobile, customerId, password } = createUserDto;

      const existingUser = await this.userRepository.findOne({ mobile });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      let registrationType = 'new';
      if (customerId) {
        const isValidCustomer =
          await this.provisioningSystemService.verifyCustomerId(customerId);
        if (!isValidCustomer) {
          throw new BadRequestException('Invalid customerId');
        }
        registrationType = 'existing';
      }
      const newUser = {
        ...createUserDto,
        mobile,
        customerId,
        password: hashedPassword,
        status: 'pending',
        registrationType: registrationType,
      };
      const result = await this.userRepository.create(newUser);
      if (result) {
        const otp = await this.otpGenerateService.generateOtp(mobile);
        const notification = {
          title: 'Sir Care Otp',
          message: otp,
          recipient: mobile,
        };
        await this.notificationService.sendNotification(['sms'], notification);
        return otp;
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Unable to create user');
    }
  }

  async getAllUsers(): Promise<any> {
    try {
      const users: User[] = await this.userRepository.findAll();
      // return users.map((user) => ({
      //   name: user.name,
      //   email: user.email,
      //   // createdAt: user.createdAt.toISOString(),
      //   // updatedAt: user.updatedAt.toISOString(),
      //   _id: user._id.toString(),
      // }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Unable to fetch users');
    }
  }

  async verifyUser(mobile: string, otp: string) {
    const checkOtp = await this.otpGenerateService.verifyOtp(mobile, otp);

    if (!checkOtp) {
      return 'Not valid';
    }

    const userProfile = await this.userRepository.findOne({ mobile });

    if (!userProfile) {
      return 'user Not found';
    } else {
      await this.userRepository.update(userProfile._id.toString(), {
        status: 'active',
      });
    }

    // if (userProfile.customerId) {
    //   const serviceIds = await this.provisioningSystemService.CustomerService(
    //     userProfile.customerId,
    //   );
    //   for (const data of serviceIds) {
    //     const data1 = {
    //       serviceId: data.id,
    //       userId: userProfile._id.toString(),
    //       status: 'Active',
    //       activationDate:
    //         data.activationDate instanceof Date
    //           ? data.activationDate.getTime()
    //           : Number(data.activationDate),
    //       deactivationDate:
    //         data.deactivationDate instanceof Date
    //           ? data.deactivationDate.getTime()
    //           : Number(data.deactivationDate),
    //       paymentType: data.paymentType.toString(),
    //       cost: Number(data.cost),
    //     };

    //     await this.VASRepository.create(data1);
    //   }
    // }

    return 'success';
  }

  async resetPassword(resetPassword: any) {
    const existingUser = await this.userRepository.findOne({
      mobile: resetPassword.mobile,
    });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(resetPassword.password, 10);

    return await this.userRepository.update(existingUser._id.toString(), {
      password: hashedPassword,
    });
  }

  async signIn(
    mobile: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const existingUser = await this.userRepository.findOne({ mobile });
    if (!existingUser) {
      throw new Error('User already exists');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token
    const payload = { mobile: existingUser.mobile, userId: existingUser._id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
