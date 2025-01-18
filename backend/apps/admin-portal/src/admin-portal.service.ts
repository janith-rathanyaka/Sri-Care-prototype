import { MongoRepository } from '@app/database/repository/mongo.repository';
import { Services } from '@app/shared/schemas/services.schema';
import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AdminPortalService {
  private readonly logger = new Logger('AdminPortalService');
  constructor(
    @Inject('ServicesRepository')
    private readonly servicesRepository: MongoRepository<Services>,
  ) {}
  async addService(serviceData: any) {
    return await this.servicesRepository.create(serviceData);
  }

  async updateService(_id: string, serviceData: any) {
    // const trimmedId = id.trim();

    // // Validate the ID format
    // if (!Types.ObjectId.isValid(trimmedId)) {
    //   throw new BadRequestException(`Invalid ID format: ${trimmedId}`);
    // }

    const existingService = await this.servicesRepository.findOne({
      _id: { $eq: _id },
    });

    if (!existingService) {
      throw new NotFoundException(`Service with ID ${_id} not found`);
    }

    return await this.servicesRepository.update(_id, serviceData);
  }

  deleteService(id: string) {
    return this.servicesRepository.delete({ _id: Object(id) });
  }

  getAllServices() {
    return this.servicesRepository.findAll();
  }

  getService(_id: any) {
    return this.servicesRepository.findOne({ _id });
  }
}
