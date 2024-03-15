import { CreateElevatorDto } from '../../../dto/command';

export const mockValidCreateElevatorDto: CreateElevatorDto = {
  elevatorNo: 102,
  currentFloorId: 0,
};

export const mockDuplicateElevatorDto: CreateElevatorDto = {
  elevatorNo: 3,
  currentFloorId: 0,
};

export const mockNegativeCreateElevatorDto = {
  elevatorNo: -1,
};

export const mockEmptyElevatorDto = {
  elevatorNo: null,
};

export const mockStringElevatorDto = {
  elevatorNo: 'Elevator 1',
};
