import { Module } from '@nestjs/common';
import { ServiceManagementController } from './service_management.controller';
import { ServiceManagementService } from './service_management.service';

@Module({
  imports: [],
  controllers: [ServiceManagementController],
  providers: [ServiceManagementService],
})
export class ServiceManagementModule {}
