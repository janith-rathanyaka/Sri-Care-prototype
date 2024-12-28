import { Test, TestingModule } from '@nestjs/testing';
import { AccessManagementController } from './access_management.controller';
import { AccessManagementService } from './access_management.service';

describe('AccessManagementController', () => {
  let accessManagementController: AccessManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccessManagementController],
      providers: [AccessManagementService],
    }).compile();

    accessManagementController = app.get<AccessManagementController>(AccessManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(accessManagementController.getHello()).toBe('Hello World!');
    });
  });
});
