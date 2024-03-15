import { CreateFloorDto } from '../../../dto/command/';

export const mockValidCreateFloorDto: CreateFloorDto = {
  floorNo: 3,
};

export const mockNegativeCreateFloorDto: CreateFloorDto = {
  floorNo: -1,
};

export const mockDuplicateCreateFloorDto: CreateFloorDto = {
  floorNo: 1,
};

export const mockEmptyFloorDto = {
  floorNo: null,
};

export const mockStringFloorDto = {
  floorNo: 'Floor 1',
};
