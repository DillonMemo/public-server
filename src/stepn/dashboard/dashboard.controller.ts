import { Controller, Get } from '@nestjs/common';
import { DashboardType } from './dashboard.entity';
import { DashboardService } from './dashboard.service';
import { GetActivationUserOutput } from './dtos/get-activation-user.dto';

@Controller('stepn/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(DashboardType.ACTIVATIONUSER.toLowerCase())
  getActivationUser(): Promise<GetActivationUserOutput> {
    return this.dashboardService.getActivationUser();
  }
}
