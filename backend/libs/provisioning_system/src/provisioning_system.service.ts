import { Injectable } from '@nestjs/common';

@Injectable()
export class ProvisioningSystemService {
  async verifyCustomerId(customerId: string): Promise<boolean> {
    // Mock STL customerId validation
    const validCustomerIds = ['STL123456', 'STL654321']; // Example list
    return validCustomerIds.includes(customerId);
  }

  async CustomerService(customerId: string): Promise<number[]> {
    // Mock STL customerId validation
    const validCustomerIds = {
        STL123456: [
          {
            id: 1,
            activationDate: new Date().getTime(),
            deactivationDate: new Date().getTime(),
            paymentType: 'pre-paid',
            cost: '20',
          },
          {
            id: 4,
            activationDate: new Date().getTime(),
            deactivationDate: new Date().getTime(),
            paymentType: 'post-paid',
            cost: '15',
          },
          {
            id: 6,
            activationDate: new Date().getTime(),
            deactivationDate: new Date().getTime(),
            paymentType: 'pre-paid',
            cost: '30',
          },
        ],
        STL654321: [
          {
            id: 2,
            activationDate: new Date().getTime(),
            deactivationDate: new Date().getTime(),
            paymentType: 'post-paid',
            cost: '25',
          },
          {
            id: 3,
            activationDate: new Date().getTime(),
            deactivationDate: new Date().getTime(),
            paymentType: 'pre-paid',
            cost: '10',
          },
        ],
      };
  
    // Return the array of data if customerId exists, otherwise return an empty array
    return validCustomerIds[customerId] || [];
  }
}
