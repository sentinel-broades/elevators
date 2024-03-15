import { mockElevatorList } from '../elevator';

const mockElevatorJobs = () => {
  const elevators = mockElevatorList();
  elevators.forEach((elv) => (elv.currentFloor.floorNo = 0));
};
