import { MongoRepository } from '@app/database/repository/mongo.repository';
import { NotificationsService } from '@app/notifications';
import { Bill } from '@app/shared/schemas/bill.schema';
import { User } from '@app/shared/schemas/user.schema';
import { VAS } from '@app/shared/schemas/vas.schema';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class BillingService {
  constructor(
    @Inject('BillRepository')
    private readonly billRepository: MongoRepository<Bill>,
    @Inject('UserRepository')
    private readonly userRepository: MongoRepository<User>,
    @Inject('VASRepository')
    private readonly VASRepository: MongoRepository<VAS>,
    private readonly notificationService: NotificationsService,
  ) {}

  async getAllBilling(
    userId: string,
    startTime?: number,
    endTime?: number,
  ): Promise<any> {
    const query: any = { userId };

    if (startTime || endTime) {
      query.createdAt = {};
      if (startTime) {
        query.createdAt.$gte = startTime; // Greater than or equal to startTime (epoch)
      }
      if (endTime) {
        query.createdAt.$lte = endTime; // Less than or equal to endTime (epoch)
      }
    }

    return this.billRepository.findAll(query);
  }

  async getBillingById(userId: string, id: string): Promise<any> {
    return this.billRepository.findOne({
      userId: userId,
      _id: new Types.ObjectId(id),
    });
  }

  async generateBill() {
    console.log('data', new Date().getTime());
    const todoPayment = await this.VASRepository.findAll({
      status: 'Active',
      paymentType: 'post-pay', // Match "paymentType"
      deactivationDate: { $lt: new Date().getTime() },
    });

    for (let i = 0; i < todoPayment.length; i++) {
      await this.billRepository.create({
        userId: todoPayment[i].userId,
        amount: todoPayment[i].cost,
        status: 'Unpaid',
        vasId: todoPayment[i]?._id.toString(),
        generatedDate: todoPayment[i].activationDate, // Convert to timestamp if needed
        dueDate: todoPayment[i].deactivationDate,
      });
      await this.VASRepository.update(todoPayment[i]?._id.toString(), {
        status: 'Inactive',
      });
      const notification = {
        title: 'Sir Care Bill',
        message: 'Please Pay Your bill',
        recipient: '+713445567',
      };
      await this.notificationService.sendNotification(['sms'], notification);
    }

    return 'success';
  }

  async notifyDueBills() {
    const currentDate = new Date(); // Current date
    const datePlusTwoDays = new Date(
      currentDate.getTime() + 2 * 24 * 60 * 60 * 1000,
    );
    const data = await this.billRepository.findAll({
      status: 'Unpaid',
      generatedDate: {
        $lt: datePlusTwoDays.getTime(),
      },
    });

    for (let i = 0; i < data.length - 1; i++) {
      const userData = await this.userRepository.findById(data[i].userId);
      if (!userData) {
        continue;
      }
      const notification = {
        title: 'Sir Care Reminder Bill',
        message: 'Please Reminder Pay Your bill',
        recipient: userData.mobile,
      };
      await this.notificationService.sendNotification(['sms'], notification);
    }
  }

  async disconnectService() {
    const currentDate = new Date(); // Current date
    const datePlusTwoDays = new Date(
      currentDate.getTime() + 2 * 24 * 60 * 60 * 1000,
    );
    const data = await this.billRepository.findAll({
      status: 'Unpaid',
      generatedDate: {
        $lt: datePlusTwoDays.getTime(),
      },
    });

    for (let i = 0; i < data.length - 1; i++) {
      const userData = await this.userRepository.findById(data[i].userId);
      if (!userData) {
        continue;
      }
      const notification = {
        title: 'Sir Care Reminder Bill',
        message: 'Please Reminder Pay Your bill',
        recipient: userData.mobile,
      };
      await this.notificationService.sendNotification(['sms'], notification);
    }
  }
}
