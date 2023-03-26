import { Injectable } from '@nestjs/common';
import { ScheduleService } from '../schedule/schedule.service';
import { GetActivationUserOutput } from './dtos/get-activation-user.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly scheduleService: ScheduleService) {}
  async getActivationUser(): Promise<GetActivationUserOutput> {
    try {
      if (!this.scheduleService.activationUsers) {
        return {
          ok: false,
          error: {
            ko: '활성 유저를 가져오지 못했습니다 (5분후 다시 실행 해주세요)',
            en: 'Failed to get active user (please relaunch after 5 minutes)',
          },
        };
      }

      return {
        ok: true,
        activationUsers: this.scheduleService.activationUsers,
      };
    } catch (error) {
      return {
        error: {
          ko: '활성 유저 정보를 가져오는데 실패 했습니다.',
          en: 'Failed get activation user',
        },
        ok: false,
      };
    }
  }
}
