import { MongoRepository } from '@app/database/repository/mongo.repository';
import { AbstractRepository } from '@app/database/repository/repository.interface';
import { CreateUserDto } from '@app/shared/dtos/create-user.dto';
import { UserResponseDto } from '@app/shared/dtos/user-response.dto';
import { VerifyUserDto } from '@app/shared/dtos/verify-user.dto';
import { User } from '@app/shared/interface/user.interface';
import { UserDocument } from '@app/shared/schemas/user.schema';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { VerifyUserService } from './verify_user.service';

@Injectable()
export class AccessManagementService {
  private readonly logger = new Logger('AccessManagementService');
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: MongoRepository<UserDocument>;
    private readonly verifyUserService: VerifyUserService;
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
   try {
    const { mobile, customerId ,password } = createUserDto;
    
    const existingUser = await this.userRepository.findOne({ mobile });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    if(customerId) {
      const isValidCustomer = await this.verifyUserService.verifyCustomerId(customerId);
      if (!isValidCustomer) {
        throw new BadRequestException('Invalid customerId');
      }
    }
    const newUser: User = {
      ...createUserDto,
      mobile,
      customerId,
      password: hashedPassword,
      status: 'pending', 
    }
    const result = await this.userRepository.create(newUser);
    if(result) {
      
    }
   } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Unable to create user');
   }
  }


  async getAllUsers(): Promise<UserResponseDto[]> {
     try{
      const users: UserDocument[] = await this.userRepository.findAll();
      return users.map((user) => ({
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        _id: user._id.toString(),
      }));
     }catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Unable to fetch users');
     }
  }

}
