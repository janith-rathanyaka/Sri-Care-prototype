import { MongoRepository } from '@app/database/repository/mongo.repository';
import { AbstractRepository } from '@app/database/repository/repository.interface';
import { CreateUserDto } from '@app/shared/dtos/create-user.dto';
import { UserResponseDto } from '@app/shared/dtos/user-response.dto';
import { VerifyUserDto } from '@app/shared/dtos/verify-user.dto';
import { User } from '@app/shared/interface/user.interface';
import { UserDocument } from '@app/shared/schemas/user.schema';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AccessManagementService {
  private readonly logger = new Logger('AccessManagementService');
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: MongoRepository<UserDocument>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userRepository.create(createUserDto) as unknown as UserDocument;
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
