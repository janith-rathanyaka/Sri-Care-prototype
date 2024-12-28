import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}
