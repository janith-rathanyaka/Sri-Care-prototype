import {
  Controller,
  Get,
  Logger,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@app/core/jwt-config/auth-guards/auth.guard';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @UseGuards(AuthGuard)
  @Get('get-billing')
  async getAllBilling(
    @Request() req:any,
    @Query('userId') userId: string,
    @Query('startTime') startTime?: string,
    @Query('endTime') endTime?: string,
  ) {
    if (!userId) {
      throw new HttpException('UserId is required', HttpStatus.BAD_REQUEST);
    }
    let start: number | undefined;
    let end: number | undefined;

    if (startTime) {
      start = parseInt(startTime, 10);
      if (isNaN(start)) {
        throw new HttpException(
          'Invalid startTime format',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (endTime) {
      end = parseInt(endTime, 10);
      if (isNaN(end)) {
        throw new HttpException(
          'Invalid endTime format',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.billingService.getAllBilling(userId, start, end);
  }
  
  @UseGuards(AuthGuard)
  @Get('get-billing-by-id')
  async getBillingById(
    @Query('userId') userId: string,
    @Query('id') id: string,
  ) {
    return this.billingService.getBillingById(userId, id);
  }

  @Get('test')
  async testBillCreate() {
    return this.billingService.generateBill();
  }

  @Get('test-notify')
  async testBillNotify() {
    return this.billingService.notifyDueBills();
  }
}
