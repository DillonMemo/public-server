import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionModule } from './daks/action/action.module';
import { ScheduleModule } from '@nestjs/schedule';

import { Visit } from './daks/visit/visit.entity';
import { VisitModule } from './daks/visit/visit.module';
import { DashboardModule } from './stepn/dashboard/dashboard.module';
import { ScheduleModule as CronModule } from './stepn/schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').required(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),
      entities: [Visit, Action],
      // synchronize: process.env.NODE_ENV !== 'production'
      synchronize: true,
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    VisitModule,
    ActionModule,
    DashboardModule,
    CronModule,
  ],
})
export class AppModule {}
