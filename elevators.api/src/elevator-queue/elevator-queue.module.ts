import { Module } from '@nestjs/common';
import { ElevatorQueueService } from './elevator-queue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElevatorJob } from '../entities/elevator.job.entity';
import { UtilsModule } from '../utils/utils.module';
import { SettingModule } from '../setting/setting.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ElevatorJob]),
    UtilsModule,
    SettingModule,
  ],
  providers: [ElevatorQueueService],
  exports: [ElevatorQueueService],
})
export class ElevatorQueueModule {}
