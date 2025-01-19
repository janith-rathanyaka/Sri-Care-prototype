import { Module } from '@nestjs/common';
import { ProvisioningSystemService } from './provisioning_system.service';

@Module({
  providers: [ProvisioningSystemService],
  exports: [ProvisioningSystemService],
})
export class ProvisioningSystemModule {}
