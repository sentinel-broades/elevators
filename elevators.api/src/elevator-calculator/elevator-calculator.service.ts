import { Injectable } from '@nestjs/common';
import { Elevator } from '../entities/elevator.entity';
import { IElevatorCalcSettings, IElevatorSelection } from '../interfaces';
import { ElevatorJob } from '../entities/elevator.job.entity';
import { JobState } from '../enums';
import { LoggerService } from '../utils/logger/logger.service';
import { SettingService } from '../setting/setting.service';

@Injectable()
export class ElevatorCalculatorService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly settingService: SettingService,
  ) {}

  public calculateAvailability(
    elevators: Elevator[],
    floorNo: number,
  ): IElevatorSelection[] {
    const calcSettings = this.settingService.getElevatorCalcSettings();

    return elevators.map((elevator) => {
      const sortedJobs = this.sortJobsByTime(elevator.queue);
      const hasJobs = Boolean(sortedJobs.length);

      const timeToAvailable: number = this.calculateTimeToAvailability(
        elevator,
        sortedJobs,
        calcSettings,
      );

      const floorFrom = hasJobs
        ? sortedJobs[0].floorTo.floorNo
        : elevator.currentFloor.floorNo;

      const timeToMe = this.calculateTimeToReachMe(
        timeToAvailable,
        floorFrom,
        floorNo,
        calcSettings,
      );

      return {
        id: elevator.id,
        timeToMe,
        elevatorNo: elevator.elevatorNo,
        jobCount: sortedJobs.length,
        floorFromId:
          sortedJobs.length === 0
            ? elevator.currentFloorId
            : sortedJobs[0].floorToId,
      };
    });
  }

  public pickQuickest(selection: IElevatorSelection[]) {
    const sortedElevators = selection.sort((a, b) => {
      if (a.timeToMe === b.timeToMe) {
        return a.jobCount - b.jobCount;
      }
      return a.timeToMe - b.timeToMe;
    });

    const nearestElevator = sortedElevators[0];

    return {
      id: nearestElevator.id,
      timeToMe: nearestElevator.timeToMe,
      jobCount: nearestElevator.jobCount,
      floorFromId: nearestElevator.floorFromId,
    };
  }

  private calculateTimeToAvailability(
    elevator: Elevator,
    queue: ElevatorJob[],
    calcSettings: IElevatorCalcSettings,
  ): number {
    let timeToAvailable: number = 0;

    queue.map((job) => {
      const floorFrom =
        job.jobState === JobState.inProgress
          ? elevator.currentFloor.floorNo
          : job.floorFrom.floorNo;

      timeToAvailable += this.calculateTimeToFloor(
        floorFrom,
        job.floorTo.floorNo,
        calcSettings,
      );
      timeToAvailable += calcSettings.defaultElevatorStopTime;
    });

    return timeToAvailable;
  }

  private calculateTimeToFloor(
    floorFrom: number,
    floorTo: number,
    calcSettings: IElevatorCalcSettings,
  ): number {
    const floorsToDestination = Math.abs(floorFrom - floorTo);

    return (
      (floorsToDestination * calcSettings.defaultFloorHeight) /
      calcSettings.defaultElevatorSpeed
    );
  }

  private sortJobsByTime(queue: ElevatorJob[]): ElevatorJob[] {
    const compareJobs = (job1: ElevatorJob, job2: ElevatorJob) =>
      job2.time - job1.time;
    return queue.sort(compareJobs);
  }

  private calculateTimeToReachMe(
    timeToAvailable: number,
    floorFrom: number,
    floorTo: number,
    calcSettings: IElevatorCalcSettings,
  ): number {
    const timeToFloor = this.calculateTimeToFloor(
      floorFrom,
      floorTo,
      calcSettings,
    );
    return timeToAvailable + timeToFloor;
  }
}
