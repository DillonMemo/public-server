import { Global, Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Module({
  providers: [ScheduleService],
  exports: [ScheduleService],
})
@Global()
export class ScheduleModule {}
