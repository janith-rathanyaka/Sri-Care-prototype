import { Test, TestingModule } from '@nestjs/testing';
import { AdminPortalController } from './admin-portal.controller';
import { AdminPortalService } from './admin-portal.service';

describe('AdminPortalController', () => {
  let AdminPortalController: AdminPortalController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdminPortalController],
      providers: [AdminPortalService],
    }).compile();

    AdminPortalController = app.get<AdminPortalController>(AdminPortalController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(AdminPortalController.getHello()).toBe('Hello World!');
    });
  });
});
