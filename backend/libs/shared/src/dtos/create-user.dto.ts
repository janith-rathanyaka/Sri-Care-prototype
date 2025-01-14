import { IsString, IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
    required: false, // Make it optional in Swagger if marked as optional
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Mobile number of the user',
    example: '1234567890',
  })
  @IsNumber()
  @IsNotEmpty()
  mobile: number;

  @ApiProperty({
    description: 'Customer ID associated with the user',
    example: 'CUST123456',
  })

  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'securePassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
