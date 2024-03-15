import { CreateSettingDto } from '../dto/command';
import { SettingType } from '../enums';
import {
  DEFAULT_ELEVATOR_SPEED,
  DEFAULT_ELEVATOR_STOP_TIME,
  DEFAULT_FLOOR_HEIGHT,
  LAUNCH_TIME,
} from '../constants/setting.names';

export const SettingsSeed: CreateSettingDto[] = [
  {
    name: LAUNCH_TIME,
    value: (Date.now() / 1000).toFixed(1),
    type: SettingType.number,
  },
  {
    name: DEFAULT_ELEVATOR_SPEED,
    value: '5',
    type: SettingType.number,
  },
  {
    name: DEFAULT_FLOOR_HEIGHT,
    value: '3',
    type: SettingType.number,
  },
  {
    name: DEFAULT_ELEVATOR_STOP_TIME,
    value: '10',
    type: SettingType.number,
  },
];
