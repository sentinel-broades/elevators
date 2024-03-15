import { CreateFloorDto } from '../../../dto/command/';
import { mockFloorList } from './mock.floor.list';
import { Floor } from '../../../entities/floor.entity';

export const mockFloorRepo = {
  create: jest.fn().mockImplementation((data) => data),
  save: jest.fn().mockImplementation((data: CreateFloorDto) => {
    const newFloor: Floor = {
      createdAt: new Date(),
      floorFromEvents: [],
      floorNo: data.floorNo,
      floorToEvents: [],
      id: 3,
      updatedAt: new Date(),
      elevatorsOnThisFloor: [],
      floorFromQueue: [],
      floorToQueue: [],
    };

    Object.setPrototypeOf(newFloor, Floor.prototype);
    return Promise.resolve(newFloor);
  }),
  findOneBy: jest.fn().mockImplementation((query: { floorNo: number }) => {
    return Promise.resolve(
      mockFloorList().find((x) => x.floorNo === query.floorNo),
    );
  }),
};
