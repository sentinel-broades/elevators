import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElevatorJob } from '../entities/elevator.job.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../utils/logger/logger.service';
import { IElevatorJob } from '../interfaces';
import { Interval } from '@nestjs/schedule';
import { JobState } from '../enums';
import { SettingService } from '../setting/setting.service';
import { LAUNCH_TIME } from '../constants/setting.names';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ElevatorQueueService {
  constructor(
    @InjectRepository(ElevatorJob)
    private readonly jobRepo: Repository<ElevatorJob>,
    private readonly loggerService: LoggerService,
    private readonly settingService: SettingService,
    private readonly utilsService: UtilsService,
  ) {}

  async createJob(data: Partial<IElevatorJob>) {
    const job = this.jobRepo.create(data);
    await this.jobRepo.save(job);
  }

  @Interval(1000)
  async processQueue() {
    const calcSettings = this.settingService.getElevatorCalcSettings();
    const launchTime = Number(
      this.settingService.getSetting(LAUNCH_TIME).value,
    );

    const progressJobs = await this.jobRepo.find({
      where: { jobState: JobState.inProgress },
      relations: ['floorFrom', 'floorTo'],
    });

    const waitingJobs = await this.jobRepo.find({
      where: { jobState: JobState.waiting },
    });

    await Promise.all(
      progressJobs.map(async (job) => {
        const floorsToDestination = Math.abs(
          job.floorFrom.floorNo - job.floorTo.floorNo,
        );

        const expectedJobTime =
          (floorsToDestination * calcSettings.defaultFloorHeight) /
            calcSettings.defaultElevatorSpeed +
          calcSettings.defaultElevatorStopTime;

        if (this.utilsService.now() - launchTime - job.time > expectedJobTime) {
          await this.deleteJob(job.id);
          const elevatorJobs = waitingJobs.filter(
            (waitJob) => waitJob.elevatorId === job.elevatorId,
          );

          if (elevatorJobs.length > 0) {
            const nextJob = elevatorJobs.sort((a, b) => a.time - b.time)[0];

            await this.updateJob({
              id: nextJob.id,
              jobState: JobState.inProgress,
            });
          }
        }
      }),
    );
  }

  async updateJob(data: Partial<IElevatorJob>) {
    const job = await this.jobRepo.findOneBy({ id: data.id });

    if (!job) {
      const msg = `job ${job.id} not found`;
      this.loggerService.error(msg);
      throw new NotFoundException(msg);
    }

    Object.assign(job, data);
    await this.jobRepo.save(job);
  }

  async deleteJob(jobId: number) {
    const job = await this.jobRepo.findOneBy({ id: jobId });

    console.log(`deleting job ${jobId}`);

    if (!job) {
      const msg = `Job ${jobId} not found`;
      this.loggerService.error(msg);
      throw new NotFoundException(msg);
    }

    await this.jobRepo.remove(job);
  }
}
