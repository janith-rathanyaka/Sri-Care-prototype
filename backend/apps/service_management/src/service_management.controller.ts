import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ServiceManagementService } from './service_management.service';

@Controller()
export class ServiceManagementController {
  constructor(private readonly serviceManagementService: ServiceManagementService) {}

  @Patch('service-status/:id')
  ActiveService(@Param('id') id: string): Promise<any> {
    return this.serviceManagementService.ActiveService(id);
  }
   
}
