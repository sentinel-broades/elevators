import { Injectable } from '@nestjs/common';
import { ElevatorService } from './elevator/elevator.service';
import { FloorService } from './floor/floor.service';

@Injectable()
export class AppService {
  constructor(
    private readonly elevatorService: ElevatorService,
    private readonly floorService: FloorService,
  ) {}

  async onModuleInit() {
    await this.seedFloors();
    await this.seedElevators();
  }

  async seedFloors() {
    const floors = await this.floorService.listFloors();

    if (floors.length === 0) {
      console.log('seeding floors');
      for (let i = 0; i <= 50; i++) {
        await this.floorService.createFloor({ floorNo: i });
      }
    }
  }

  async seedElevators() {
    const elevators = await this.elevatorService.listElevators();
    if (elevators.length === 0) {
      console.log('seeding elevators');
      const groundFloor = await this.floorService.getFloor(0);

      for (let i = 1; i <= 5; i++) {
        await this.elevatorService.createElevator({
          elevatorNo: i,
          currentFloorId: groundFloor.id,
        });
      }
    }
  }
}
