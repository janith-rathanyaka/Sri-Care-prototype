import { MongoRepository } from '@app/database/repository/mongo.repository';
import { Services } from '@app/shared/schemas/services.schema';
import { VAS } from '@app/shared/schemas/vas.schema';
import { Inject, Injectable } from '@nestjs/common';
import { access } from 'fs';

@Injectable()
export class ServiceManagementService {
  constructor(
    @Inject('ServicesRepository')
    private readonly ServicesRepository: MongoRepository<Services>,
    @Inject('VASRepository')
    private readonly VASRepository: MongoRepository<VAS>,
  ) {}

  async findActiveService(id: string, userId: string): Promise<any> {
    try {
      const serviceData = await this.ServicesRepository.findOne({ _id: id });
      if (!serviceData) {
        return null;
      }
      if (serviceData.status !== 'Active') {
        return 'service is not active';
      }
      let expireDate = new Date();
      if (serviceData.ValidTimePeriod !== 'unlimited') {
        expireDate.setMonth(
          expireDate.getMonth() + Number(serviceData.ValidTimePeriod),
        );
      }
      const data = {
        serviceId: id,
        userId,
        status: 'Active',
        activationDate: new Date(),
        deactivationDate: expireDate,
      };
      return await this.VASRepository.create(data);
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

    if (existingService.deactivationDate) {
      return 'cannot deactivated service';
    }

    if (existingService?.deactivationDate < new Date()) {
      return 'service already expired';
    }

    if (existingService.status === 'Active') {
      return await this.VASRepository.update(id, {
        status: 'Inactive',
        deactivationDate: new Date(),
      });
    }
  }
}
