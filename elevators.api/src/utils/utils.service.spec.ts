import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the current timestamp in seconds to one decimal place', () => {
    const mockDate = new Date();
    const timeSpy = jest.spyOn(Date, 'now');
    timeSpy.mockImplementation(() => mockDate.getTime());

    const expectedTime = parseFloat((mockDate.getTime() / 1000).toFixed(1));
    expect(service.now()).toBe(expectedTime);
    timeSpy.mockRestore();
  });
});
