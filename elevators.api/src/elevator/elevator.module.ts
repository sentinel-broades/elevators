import { Module } from '@nestjs/common';
import { ElevatorService } from './elevator.service';
import { ElevatorController } from './elevator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Elevator } from '../entities/elevator.entity';
import { UtilsModule } from '../utils/utils.module';
import { SettingModule } from '../setting/setting.module';

@Module({
  imports: [TypeOrmModule.forFeature([Elevator]), UtilsModule],
  providers: [ElevatorService],
  controllers: [ElevatorController],
  exports: [ElevatorService],
})
export class ElevatorModule {}
