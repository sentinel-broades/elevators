import { Floor } from '../../../entities/floor.entity';

export const mockFloorList = (): Floor[] => {
  const floorList: Floor[] = [];
  for (let i = 0; i <= 50; i++) {
    const floor = new Floor();
    floor.floorNo = i;
    floorList.push(floor);
  }
  return floorList;
};
