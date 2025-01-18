import { MongoRepository } from '@app/database/repository/mongo.repository';
import { Services } from '@app/shared/schemas/services.schema';
import { VAS } from '@app/shared/schemas/vas.schema';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ServiceManagementService {
   constructor(
     @Inject('ServicesRepository')
     private readonly ServicesRepository: MongoRepository<Services>;
     @Inject('VASRepository')
     private readonly VASRepository: MongoRepository<VAS>;
   ) {}

   ActiveService(id: string): Promise<any> {
    return this.ServicesRepository.findOne({ _id: id });
  }
}
