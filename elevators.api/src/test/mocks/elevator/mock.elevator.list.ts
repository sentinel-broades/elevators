import { Elevator } from '../../../entities/elevator.entity';
import { ElevatorState } from '../../../enums';
import { SettingsSeed } from '../../../seed';

export const mockElevatorList = (): Elevator[] => {
  const elevators: Elevator[] = [];
  for (let i = 1; i <= 5; i++) {
    const elevator = new Elevator();
    elevator.elevatorNo = i;
    elevator.currentFloorId = 1;
    elevator.events = [];
    elevator.queue = [];
    elevator.currentFloor = null;
    elevators.push(elevator);
  }
  return elevators;
};
