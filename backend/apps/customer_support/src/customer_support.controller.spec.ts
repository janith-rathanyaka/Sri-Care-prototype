import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSupportController } from './customer_support.controller';
import { CustomerSupportService } from './customer_support.service';

describe('CustomerSupportController', () => {
  let customerSupportController: CustomerSupportController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSupportController],
      providers: [CustomerSupportService],
    }).compile();

    customerSupportController = app.get<CustomerSupportController>(CustomerSupportController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(customerSupportController.getHello()).toBe('Hello World!');
    });
  });
});
