import { CreateUserDto } from '@app/shared/dtos/create-user.dto';
import { VerifyUserDto } from '@app/shared/dtos/verify-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccessManagementService } from './access_management.service';
import { VerifyUserService } from './verify_user.service';

@Controller()
export class AccessManagementController {
  constructor(private readonly accessManagementService: AccessManagementService,
    private readonly verifyUserService: VerifyUserService
    ) {}

  @Post('verify-user')
  verifyUser(@Body() verifyUser: VerifyUserDto) {
      return this.verifyUserService.verifyUser(verifyUser); 
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
      return this.accessManagementService.createUser(createUserDto)
  }

  @Get('get-users')
  GetAllUsers() {
    return this.accessManagementService.getAllUsers();
  }

}
