import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class ElevatorStateService {
  @Interval(1000)
  handleElevatorState() {
    //  console.log('Checking State');
  }
}
