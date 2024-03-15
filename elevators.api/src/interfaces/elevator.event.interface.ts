import { JobState } from '../enums';

export interface IElevatorEvent {
  time: number;
  elevatorId: number;
  floorFromId: number;
  floorToId: number;
}
