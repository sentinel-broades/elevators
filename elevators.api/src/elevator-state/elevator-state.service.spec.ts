import { Test, TestingModule } from '@nestjs/testing';
import { ElevatorStateService } from './elevator-state.service';

describe('ElevatorStateService', () => {
  let service: ElevatorStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElevatorStateService],
    }).compile();

    service = module.get<ElevatorStateService>(ElevatorStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
