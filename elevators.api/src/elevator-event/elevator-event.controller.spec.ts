import { Test, TestingModule } from '@nestjs/testing';
import { ElevatorEventController } from './elevator-event.controller';

describe('ElevatorEventController', () => {
  let controller: ElevatorEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElevatorEventController],
    }).compile();

    controller = module.get<ElevatorEventController>(ElevatorEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
