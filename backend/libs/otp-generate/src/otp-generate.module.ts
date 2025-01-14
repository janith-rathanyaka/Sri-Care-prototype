import { Module } from '@nestjs/common';
import { OtpGenerateService } from './otp-generate.service';

@Module({
  providers: [OtpGenerateService],
  exports: [OtpGenerateService],
})
export class OtpGenerateModule {}
