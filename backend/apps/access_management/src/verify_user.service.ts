import { MongoRepository } from '@app/database/repository/mongo.repository';
import { VerifyUserDto } from '@app/shared/dtos/verify-user.dto';
import { CustomerDocument } from '@app/shared/schemas/customer.schema';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class VerifyUserService { 
    private readonly logger = new Logger('VerifyUserService');

    constructor(
        @Inject('CustomerRepository')
        private readonly customerRepository: MongoRepository<CustomerDocument>
      ) {}

    async verifyUser(verifyUserDto: VerifyUserDto): Promise<any> {
        this.logger.log('verify user dto', verifyUserDto)
        try {
            const normalizedMobile = this.normalizeMobileNumber(verifyUserDto.mobile);
            if(!normalizedMobile) {
              return normalizedMobile;
             }
             const data = { 
                mobile: normalizedMobile, 
                documentId: verifyUserDto.documentId 
            };
            const checkValid = await this.customerRepository.findOne(data);
            return checkValid 
        } catch (error) {
            this.logger.error('error', error)
        }
        
    }

    private normalizeMobileNumber(mobile: string): string {
        // Remove any leading '+' and spaces
        mobile = mobile.replace(/^\+/, '').replace(/\s+/g, '');
      
        if (mobile.startsWith('94')) {
          // If it starts with '94', replace it with '0'
          return mobile.replace(/^94/, '0');
        } else if (mobile.startsWith('0')) {
          // If it already starts with '0', return as is
          return mobile;
        } else {
          throw new Error('Invalid mobile number format');
        }
      }
}