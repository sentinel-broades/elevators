import { Test, TestingModule } from '@nestjs/testing';
import { ElevatorService } from './elevator.service';
import { ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Elevator } from '../entities/elevator.entity';
import {
  mockElevatorRepo,
  mockLoggerService,
  mockDuplicateElevatorDto,
  mockValidCreateElevatorDto,
  mockSettingService,
} from '../test/mocks';
import { LoggerService } from '../utils/logger/logger.service';
import { Repository } from 'typeorm';
import { CreateElevatorDto } from '../dto/command';
import { SettingService } from '../setting/setting.service';
describe('ElevatorService', () => {
  let service: ElevatorService;
  let repo: Repository<Elevator>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElevatorService,
        { provide: getRepositoryToken(Elevator), useValue: mockElevatorRepo },
        { provide: LoggerService, useValue: mockLoggerService },
        { provide: SettingService, useValue: mockSettingService },
      ],
    }).compile();

    service = module.get<ElevatorService>(ElevatorService);
    repo = module.get<Repository<Elevator>>(getRepositoryToken(Elevator));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new elevator, with status available', async () => {
    const data: CreateElevatorDto = mockValidCreateElevatorDto;
    const saveSpy = jest.spyOn(repo, 'save');
    const result = await service.createElevator(data);
    expect(saveSpy).toHaveBeenCalledWith(data);
    expect(result).toBeInstanceOf(Elevator);
    expect(result.elevatorNo).toBe(data.elevatorNo);
  });

  it('should fail to create a new elevator if one with the same name exists', async () => {
    await expect(
      service.createElevator(mockDuplicateElevatorDto),
    ).rejects.toThrow(ConflictException);
  });
});
