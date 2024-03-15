import { JobState } from '../enums';

export interface IElevatorJob {
  id: number;
  time: number;
  elevatorId: number;
  floorFromId: number;
  floorToId: number;
  jobState: JobState;
}
