import { CreateFloorDto } from '../../../dto/command/';
import { Floor } from '../../../entities/floor.entity';

export const mockFloorService = {
  createFloor: jest.fn().mockImplementation((data: CreateFloorDto) => {
    const newFloor: Floor = {
      createdAt: new Date(),
      floorFromEvents: [],
      floorNo: data.floorNo,
      floorToEvents: [],
      id: 3,
      updatedAt: new Date(),
      floorFromQueue: [],
      floorToQueue: [],
      elevatorsOnThisFloor: [],
    };

    return Promise.resolve(newFloor);
  }),
};
