import { Test, TestingModule } from '@nestjs/testing';
import { ElevatorCalculatorService } from './elevator-calculator.service';
import { SettingService } from '../setting/setting.service';
import { mockLoggerService, mockSettingService } from '../test/mocks';
import { LoggerService } from '../utils/logger/logger.service';
import { NotImplementedException } from '@nestjs/common';

describe('ElevatorCalculatorService', () => {
  let service: ElevatorCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElevatorCalculatorService,
        { provide: SettingService, useValue: mockSettingService },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compile();

    service = module.get<ElevatorCalculatorService>(ElevatorCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate a list of all elevators, displaying their time to me and job count', async () => {});

  it('should pick any elevator when all elevators are at 0', async () => {
    throw new NotImplementedException();
  });

  it('should pick the quickest elevator when elevators are on differing floors', async () => {
    throw new NotImplementedException();
  });

  it('should pick an elevator that has a job in progress if it is the closest one', async () => {
    throw new NotImplementedException();
  });

  it('should pick the elevator with the lowest number of jobs when two would take the same time', async () => {
    throw new NotImplementedException();
  });

  it('should pick any elevator if they are the same distance and have the same amount of jobs', async () => {
    throw new NotImplementedException();
  });
});
