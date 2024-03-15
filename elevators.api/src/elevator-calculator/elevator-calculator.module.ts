import { Module } from '@nestjs/common';
import { ElevatorCalculatorService } from './elevator-calculator.service';
import { Elevator } from '../entities/elevator.entity';
import { IElevatorCalcSettings, IElevatorSelection } from '../interfaces';
import { ElevatorJob } from '../entities/elevator.job.entity';
import { JobState } from '../enums';
import { SettingModule } from '../setting/setting.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [SettingModule, UtilsModule],
  providers: [ElevatorCalculatorService],
  exports: [ElevatorCalculatorService],
})
export class ElevatorCalculatorModule {}
