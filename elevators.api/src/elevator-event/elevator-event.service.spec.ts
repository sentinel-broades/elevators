import { Test, TestingModule } from '@nestjs/testing';
import { ElevatorEventService } from './elevator-event.service';
import { NotImplementedException } from '@nestjs/common';

describe('ElevatorEventService', () => {
  let service: ElevatorEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElevatorEventService],
    }).compile();

    service = module.get<ElevatorEventService>(ElevatorEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a new event', () => {
    throw new NotImplementedException();
  });

  it('finds the closest elevator', () => {
    throw new NotImplementedException();
  });

  it('returns a filtered list of all elevator events', () => {
    throw new NotImplementedException();
  });
});
