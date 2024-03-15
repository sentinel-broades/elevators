import { Test, TestingModule } from '@nestjs/testing';
import { ElevatorQueueService } from './elevator-queue.service';

describe('ElevatorQueueService', () => {
  let service: ElevatorQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElevatorQueueService],
    }).compile();

    service = module.get<ElevatorQueueService>(ElevatorQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
