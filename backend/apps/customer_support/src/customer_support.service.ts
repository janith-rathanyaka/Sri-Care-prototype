import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerSupportService {
  getHello(): string {
    return 'Hello World!';
  }
}
