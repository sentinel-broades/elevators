import { CreateElevatorDto } from '../../../dto/command';
import { Elevator } from '../../../entities/elevator.entity';
import { mockElevatorList } from './mock.elevator.list';
import { ElevatorState } from '../../../enums';

export const mockElevatorRepo = {
  create: jest.fn().mockImplementation((data) => data),
  save: jest.fn().mockImplementation((data: Elevator) => {
    const newElevator: Elevator = {
      events: [],
      createdAt: new Date(),
      elevatorNo: data.elevatorNo,
      id: 3,
      updatedAt: new Date(),
      currentFloorId: null,
      currentFloor: null,
      queue: [],
    };

    Object.setPrototypeOf(newElevator, Elevator.prototype);
    return Promise.resolve(newElevator);
  }),
  findOneBy: jest.fn().mockImplementation((query: { elevatorNo: number }) => {
    return Promise.resolve(
      mockElevatorList().find((x) => x.elevatorNo === query.elevatorNo),
    );
  }),
  find: jest.fn().mockResolvedValue(mockElevatorList()),
};
