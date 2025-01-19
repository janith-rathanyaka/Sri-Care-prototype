import { MongoRepository } from '@app/database/repository/mongo.repository';
import { NotificationsService } from '@app/notifications';
import { PaymentGateway } from '@app/shared/interface/payment-gateway.interface';
import { Bill } from '@app/shared/schemas/bill.schema';
import { Services } from '@app/shared/schemas/services.schema';
import { VAS } from '@app/shared/schemas/vas.schema';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ServiceManagementService {
  constructor(
    @Inject('ServicesRepository')
    private readonly ServicesRepository: MongoRepository<Services>,
    @Inject('VASRepository')
    private readonly VASRepository: MongoRepository<VAS>,
    @Inject('BillRepository')
    private readonly billRepository: MongoRepository<Bill>,
    private readonly notificationService: NotificationsService,
    private readonly paymentService: PaymentGateway,
  ) {}

  async findActiveService(id: string, userId: string): Promise<any> {
    try {
      console.log('dd', id);
      const serviceData = await this.ServicesRepository.findOne({ _id: id });
      if (!serviceData) {
        return null;
      }
      if (serviceData.status !== 'Active') {
        return 'service is not active';
      }
      let expireDate = new Date();
      if (serviceData?.ValidTimePeriod !== 'unlimited') {
        expireDate.setMonth(
          expireDate.getMonth() + Number(serviceData?.ValidTimePeriod ?? 6),
        );
      }
      const expireTimestamp = expireDate.getTime();
      const data = {
        serviceId: id,
        userId,
        status: 'Active',
        activationDate: new Date().getTime(),
        deactivationDate: expireTimestamp,
        paymentType: serviceData.paymentType,
        cost: serviceData.cost,
      };

      const notification = {
        title: 'Service Activation',
        message: 'Your account has been activated successfully.',
        recipient: '+713445567',
      };
      const createdData = await this.VASRepository.create(data);
      if (serviceData.paymentType === 'pre-pay') {
        const paymentData = await this.paymentService.processPayment(
          userId,
          serviceData.cost,
        );
        if (paymentData.status !== 'success') {
          return 'payment failed';
        } else {
          await this.billRepository.create({
            userId,
            amount: serviceData.cost,
            transactionId: paymentData.transactionId,
            status: 'Paid',
            vasId: createdData?._id.toString(),
            generatedDate: new Date().getTime(), // Convert to timestamp
            dueDate: new Date().getTime(),
          });
        }
      }
      await this.notificationService.sendNotification(['sms'], notification);
      return createdData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserSubServices(id: string): Promise<any> {
    return await this.VASRepository.findAll({ userId: id });
  }

  async deleteService(id: string, userId): Promise<any> {
    const existingService = await this.VASRepository.findOne({
      _id: id,
      userId: userId,
    });

    if (!existingService) {
      return null;
    }

    if (existingService.status === 'Inactive') {
      return 'service already deactivated';
    }

    if (existingService?.deactivationDate) {
      return 'cannot deactivated service';
    }

    if (existingService?.deactivationDate < new Date().getTime()) {
      return 'service already expired';
    }

    if (existingService.status === 'Active') {
      return await this.VASRepository.update(id, {
        status: 'Inactive',
        deactivationDate: new Date().getTime(),
      });
    }
  }
}
