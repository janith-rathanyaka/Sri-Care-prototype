import { Test, TestingModule } from '@nestjs/testing';
import { ServiceManagementController } from './service_management.controller';
import { ServiceManagementService } from './service_management.service';

describe('ServiceManagementController', () => {
  let serviceManagementController: ServiceManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceManagementController],
      providers: [ServiceManagementService],
    }).compile();

    serviceManagementController = app.get<ServiceManagementController>(ServiceManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceManagementController.getHello()).toBe('Hello World!');
    });
  });
});
