import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElevatorEvent } from '../entities/elevator-event.entity';
import { Repository } from 'typeorm';
import { ElevatorService } from '../elevator/elevator.service';
import { RequestElevatorDto } from '../dto/command';
import { ElevatorQueueService } from '../elevator-queue/elevator-queue.service';
import {
  IElevatorEvent,
  IElevatorJob,
  IElevatorSelection,
} from '../interfaces';
import { SettingService } from '../setting/setting.service';
import { JobState } from '../enums';
import { FloorService } from '../floor/floor.service';
import { LAUNCH_TIME } from '../constants/setting.names';
import { UtilsService } from '../utils/utils.service';
import { Floor } from '../entities/floor.entity';

@Injectable()
export class ElevatorEventService {
  constructor(
    @InjectRepository(ElevatorEvent)
    private readonly elevatorEventRepo: Repository<ElevatorEvent>,
    private readonly elevatorService: ElevatorService,
    private readonly elevatorQueueService: ElevatorQueueService,
    private readonly settingsService: SettingService,
    private readonly floorService: FloorService,
    private readonly utilService: UtilsService,
  ) {}

  public async requestElevator(data: RequestElevatorDto) {
    const timeSinceStart = this.settingsService.getSetting(LAUNCH_TIME);
    const floorTo = await this.floorService.getFloor(data.floorTo);
    const time = this.utilService.now() - Number(timeSinceStart.value);

    const closestElevator = await this.elevatorService.allocateElevator(
      data.floorFrom,
    );

    await this.createJob(closestElevator, floorTo, time);
    await this.createEvent(closestElevator, floorTo, time);
  }

  private async createJob(
    closestElevator: IElevatorSelection,
    floorTo: Floor,
    time: number,
  ) {
    const job: Partial<IElevatorJob> = {
      elevatorId: closestElevator.id,
      floorFromId: closestElevator.floorFromId,
      floorToId: floorTo.id,
      jobState:
        closestElevator.jobCount === 0 ? JobState.inProgress : JobState.waiting,
      time,
    };
    await this.elevatorQueueService.createJob(job);
  }

  private async createEvent(
    closestElevator: IElevatorSelection,
    floorTo: Floor,
    time: number,
  ) {
    const data: IElevatorEvent = {
      time,
      floorFromId: closestElevator.floorFromId,
      floorToId: floorTo.id,
      elevatorId: closestElevator.id,
    };

    const event = this.elevatorEventRepo.create(data);
    await this.elevatorEventRepo.save(event);
  }
}
