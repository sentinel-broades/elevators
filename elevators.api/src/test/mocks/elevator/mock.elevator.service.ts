import { CreateElevatorDto } from '../../../dto/command';
import { Elevator } from '../../../entities/elevator.entity';
import { ElevatorState } from '../../../enums';

export const mockElevatorService = {
  createElevator: jest.fn().mockImplementation((data: CreateElevatorDto) => {
    const newElevator: Elevator = {
      createdAt: new Date(),
      elevatorNo: data.elevatorNo,
      events: [],
      id: 3,
      updatedAt: new Date(),
      currentFloor: null,
      currentFloorId: null,
      queue: [],
    };

    return Promise.resolve(newElevator);
  }),
};
