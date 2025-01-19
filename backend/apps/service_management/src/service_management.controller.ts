import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ServiceManagementService } from './service_management.service';
import { AuthGuard } from '@app/core/jwt-config/auth-guards/auth.guard';

@Controller('service-management')
export class ServiceManagementController {
  constructor(
    private readonly serviceManagementService: ServiceManagementService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('serviceById/:id')
  ActiveService(@Param('id') id: string, @Request() req: any): Promise<any> {
    const userId = req.user.userId;
    return this.serviceManagementService.findActiveService(id, userId);
  }

  @UseGuards(AuthGuard)
  @Get('userSubServices')
  userSubServices(@Request() req: any): Promise<any> {
    const userId = req.user.userId;
    return this.serviceManagementService.findUserSubServices(userId);
  }

  @UseGuards(AuthGuard)
  @Delete('deleteService/:id')
  deleteService(@Param('id') id: string, @Request() req: any): Promise<any> {
    const userId = req.user.userId;
    return this.serviceManagementService.deleteService(id, userId);
  }
}
