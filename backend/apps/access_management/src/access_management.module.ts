import { Module } from '@nestjs/common';
import { AccessManagementController } from './access_management.controller';
import { AccessManagementService } from './access_management.service';

@Module({
  imports: [],
  controllers: [AccessManagementController],
  providers: [AccessManagementService],
})
export class AccessManagementModule {}
