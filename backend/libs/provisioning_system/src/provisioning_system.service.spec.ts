import { Test, TestingModule } from '@nestjs/testing';
import { ProvisioningSystemService } from './provisioning_system.service';

describe('ProvisioningSystemService', () => {
  let service: ProvisioningSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvisioningSystemService],
    }).compile();

    service = module.get<ProvisioningSystemService>(ProvisioningSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
