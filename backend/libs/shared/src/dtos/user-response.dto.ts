import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserResponseDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @IsString()
  _id: string;
}
