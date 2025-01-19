import { CreateUserDto } from '@app/shared/dtos/create-user.dto';
import { VerifyUserDto } from '@app/shared/dtos/verify-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccessManagementService } from './access_management.service';

@Controller()
export class AccessManagementController {
  constructor(
    private readonly accessManagementService: AccessManagementService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.accessManagementService.createUser(createUserDto);
  }

  @Post('verify-user')
  verify_user(@Body() verify_user: any) {
    return this.accessManagementService.verifyUser(
      verify_user.mobile,
      verify_user.otp,
    );
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: any) {
    return this.accessManagementService.signIn(signInDto.mobile, signInDto.password);
  }

  @Post('resetPassword')
  async resetPassword(@Body() resetPasswordDto: any) {
    return this.accessManagementService.resetPassword(resetPasswordDto);
  }
}
