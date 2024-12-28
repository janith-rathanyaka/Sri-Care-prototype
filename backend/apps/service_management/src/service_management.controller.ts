import { Controller, Get } from '@nestjs/common';
import { ServiceManagementService } from './service_management.service';

@Controller()
export class ServiceManagementController {
  constructor(private readonly serviceManagementService: ServiceManagementService) {}

  @Get()
  getHello(): string {
    return this.serviceManagementService.getHello();
  }
}
