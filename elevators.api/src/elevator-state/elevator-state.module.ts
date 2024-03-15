import { Module } from '@nestjs/common';
import { ElevatorStateService } from './elevator-state.service';
import { ElevatorModule } from '../elevator/elevator.module';
import { ElevatorEventModule } from '../elevator-event/elevator-event.module';

@Module({
  imports: [ElevatorModule, ElevatorEventModule],
  providers: [ElevatorStateService],
})
export class ElevatorStateModule {}
