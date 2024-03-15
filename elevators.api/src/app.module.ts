import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { ElevatorModule } from './elevator/elevator.module';
import { FloorModule } from './floor/floor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config';
import { ElevatorStateModule } from './elevator-state/elevator-state.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SettingModule } from './setting/setting.module';
import { ElevatorEventModule } from './elevator-event/elevator-event.module';
import { ElevatorQueueModule } from './elevator-queue/elevator-queue.module';
import { ElevatorCalculatorModule } from './elevator-calculator/elevator-calculator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ScheduleModule.forRoot(),
    UtilsModule,
    ElevatorModule,
    FloorModule,
    ElevatorStateModule,
    SettingModule,
    ElevatorEventModule,
    ElevatorQueueModule,
    ElevatorCalculatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
