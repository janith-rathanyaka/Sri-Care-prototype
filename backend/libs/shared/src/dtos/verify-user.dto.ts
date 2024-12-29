import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class VerifyUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:\+94|94|0)?7\d{8}$/, {
    message: 'Mobile number must be in the format 0771906249, +94771906249, or 94771906249',
  })
  mobile: string;

  @IsString()
  @IsNotEmpty()
  documentId: string;
}
