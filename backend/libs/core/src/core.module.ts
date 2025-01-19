import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { JwtConfigModule } from './jwt-config/jwt-config.module';

@Module({
  imports: [JwtConfigModule],
  providers: [CoreService],
  exports: [CoreService, JwtConfigModule],
})
export class CoreModule {}
