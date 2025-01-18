import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ServiceManagementService } from './service_management.service';

@Controller('service-management')
export class ServiceManagementController {
  constructor(
    private readonly serviceManagementService: ServiceManagementService,
  ) {}

  @Get('serviceById/:id')
  ActiveService(@Param('id') id: string): Promise<any> {
    const userId = '1000';
    return this.serviceManagementService.findActiveService(id, userId);
  }

  @Get('userSubServices')
  userSubServices(): Promise<any> {
    const userId = '1000';
    return this.serviceManagementService.findUserSubServices(userId);
  }

  @Delete('deleteService/:id')
  deleteService(@Param('id') id: string): Promise<any> {
    const userId = '1000';
    return this.serviceManagementService.deleteService(id, userId);
  }
}
