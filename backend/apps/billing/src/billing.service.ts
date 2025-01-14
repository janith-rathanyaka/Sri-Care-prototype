import { MongoRepository } from '@app/database/repository/mongo.repository';
import { Bill } from '@app/shared/schemas/bill.schema';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class BillingService {
  private readonly logger = new Logger('BillingService');

  constructor(
    @Inject('BillRepository')
    private readonly billRepository: MongoRepository<Bill>,
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
    this.logger.log('getBillingById', id);
    return this.billRepository.findOne({ userId : userId, _id: new Types.ObjectId(id) });
  }
}
