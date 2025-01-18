import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminPortalService } from './admin-portal.service';

@Controller('admin-portal')
export class AdminPortalController {
  constructor(private readonly AdminPortalService: AdminPortalService) {}

  @Post('add-service')
  addService(@Body() serviceData: any) {
    return this.AdminPortalService.addService(serviceData);
  }

  @Put('update-service/:id')
  updateService(@Param('id') id: string, @Body() serviceData: any) {
    return this.AdminPortalService.updateService(id, serviceData);
  }

  @Delete('delete-service/:id')
  deleteService(@Param('id') id: string) {
    return this.AdminPortalService.deleteService(id);
  }

  @Get('get-all-services')
  getAllServices() {
    return this.AdminPortalService.getAllServices();
  }

  @Get('get-service/:id')
  getService(@Param('id') id: string) {
    return this.AdminPortalService.getService(id);
  }
}
