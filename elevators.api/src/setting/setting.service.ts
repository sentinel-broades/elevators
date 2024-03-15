import { Injectable } from '@nestjs/common';
import { Setting } from '../entities/setting.entity';
import { SettingDto } from '../dto/query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../utils/logger/logger.service';
import { SettingsSeed } from '../seed';
import { IElevatorCalcSettings } from '../interfaces';
import {
  DEFAULT_ELEVATOR_SPEED,
  DEFAULT_ELEVATOR_STOP_TIME,
  DEFAULT_FLOOR_HEIGHT,
} from '../constants/setting.names';

@Injectable()
export class SettingService {
  private settings: SettingDto[] = [];

  constructor(
    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>,
    private readonly loggerService: LoggerService,
  ) {}

  async onModuleInit() {
    this.settings = await this.getAllSettings();
    if (this.settings.length === 0) this.settings = await this.seedSettings();
  }

  public listSettings(): SettingDto[] {
    return this.settings;
  }

  public getElevatorCalcSettings(): IElevatorCalcSettings {
    const defaultElevatorSpeed = this.getSetting(DEFAULT_ELEVATOR_SPEED);
    const defaultFloorHeight = this.getSetting(DEFAULT_FLOOR_HEIGHT);
    const defaultElevatorStopTime = this.getSetting(DEFAULT_ELEVATOR_STOP_TIME);

    return {
      defaultElevatorStopTime: Number(defaultElevatorStopTime.value),
      defaultElevatorSpeed: Number(defaultElevatorSpeed.value),
      defaultFloorHeight: Number(defaultFloorHeight.value),
    };
  }

  public getSetting(name: string): SettingDto {
    return this.settings.find((x) => x.name === name);
  }

  private async seedSettings(): Promise<SettingDto[]> {
    const settingDtos: SettingDto[] = [];
    for (const setting of SettingsSeed) {
      const newSetting = this.settingRepo.create(setting);
      settingDtos.push(await this.settingRepo.save(newSetting));
    }
    return settingDtos;
  }

  private async getAllSettings(): Promise<SettingDto[]> {
    const settings = await this.settingRepo.find();

    return settings.map((setting) => {
      const settingDto = new SettingDto();
      settingDto.name = setting.name;
      settingDto.value = setting.value;
      settingDto.updatedAt = setting.updatedAt;
      return settingDto;
    });
  }
}
