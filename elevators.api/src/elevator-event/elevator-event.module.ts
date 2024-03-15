import { Module } from '@nestjs/common';
import { ElevatorEventService } from './elevator-event.service';
import { ElevatorEventController } from './elevator-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElevatorEvent } from '../entities/elevator-event.entity';
import { SettingModule } from '../setting/setting.module';
import { UtilsModule } from '../utils/utils.module';
import { ElevatorModule } from '../elevator/elevator.module';
import { FloorModule } from '../floor/floor.module';
import { ElevatorQueueModule } from '../elevator-queue/elevator-queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ElevatorEvent]),
    SettingModule,
    UtilsModule,
    ElevatorModule,
    FloorModule,
    ElevatorQueueModule,
  ],

  providers: [ElevatorEventService],
  controllers: [ElevatorEventController],
})
export class ElevatorEventModule {}
