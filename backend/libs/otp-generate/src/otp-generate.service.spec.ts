import { Test, TestingModule } from '@nestjs/testing';
import { OtpGenerateService } from './otp-generate.service';

describe('OtpGenerateService', () => {
  let service: OtpGenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpGenerateService],
    }).compile();

    service = module.get<OtpGenerateService>(OtpGenerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
