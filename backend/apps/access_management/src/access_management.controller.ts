import { Controller, Get } from '@nestjs/common';
import { AccessManagementService } from './access_management.service';

@Controller()
export class AccessManagementController {
  constructor(private readonly accessManagementService: AccessManagementService) {}

  @Get()
  getHello(): string {
    return this.accessManagementService.getHello();
  }
}
