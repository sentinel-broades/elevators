import { Test, TestingModule } from '@nestjs/testing';
import { FloorService } from './floor.service';
import { ConflictException } from '@nestjs/common';
import { CreateFloorDto } from '../dto/command/create.floor.dto';
import { Repository } from 'typeorm';
import { Floor } from '../entities/floor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockDuplicateCreateFloorDto,
  mockFloorRepo,
  mockLoggerService,
  mockValidCreateFloorDto,
} from '../test/mocks';
import { LoggerService } from '../utils/logger/logger.service';

describe('FloorService', () => {
  let service: FloorService;
  let repo: Repository<Floor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FloorService,
        { provide: getRepositoryToken(Floor), useValue: mockFloorRepo },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compile();

    service = module.get<FloorService>(FloorService);
    repo = module.get<Repository<Floor>>(getRepositoryToken(Floor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new floor', async () => {
    const data: CreateFloorDto = mockValidCreateFloorDto;
    const saveSpy = jest.spyOn(repo, 'save');
    const result = await service.createFloor(data);
    expect(saveSpy).toHaveBeenCalledWith(data);
    expect(result).toBeInstanceOf(Floor);
    expect(result.floorNo).toBe(data.floorNo);
  });

  it('should fail to create a new floor if one with the same floorNo exists', async () => {
    await expect(
      service.createFloor(mockDuplicateCreateFloorDto),
    ).rejects.toThrow(ConflictException);
  });
});
