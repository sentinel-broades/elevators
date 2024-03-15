import { Test, TestingModule } from '@nestjs/testing';
import { SettingService } from './setting.service';
import { Repository } from 'typeorm';
import { Setting } from '../entities/setting.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockLoggerService, mockSettingRepo } from '../test/mocks';
import { LoggerService } from '../utils/logger/logger.service';
import { SettingsSeed } from '../seed';

describe('SettingService', () => {
  let service: SettingService;
  let repo: Repository<Setting>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingService,
        { provide: getRepositoryToken(Setting), useValue: mockSettingRepo },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compile();

    service = module.get<SettingService>(SettingService);
    repo = module.get<Repository<Setting>>(getRepositoryToken(Setting));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize settings on launch if there are none', async () => {
    mockSettingRepo.find.mockResolvedValue([]);
    await service.onModuleInit();
    const result = service.listSettings();
    const saveSpy = jest.spyOn(repo, 'save');
    expect(saveSpy).toHaveBeenCalledTimes(SettingsSeed.length);
  });

  const initSettings = async () => {
    mockSettingRepo.find.mockImplementation(() => {
      let id: 0;
      const settings: Setting[] = SettingsSeed.map((setting) => ({
        id: id++,
        name: setting.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        type: setting.type,
        value: setting.value,
      }));
      return Promise.resolve(settings);
    });
  };

  const findSetting = async () => {
    const result = await service.getSetting(SettingsSeed[0].name);
    expect(result).toBeDefined();
    expect(result.name).toBe(SettingsSeed[0].name);
    expect(result.value).toBe(SettingsSeed[0].value);
  };

  it('should load settings on launch', async () => {
    await initSettings();
    await service.onModuleInit();
    await findSetting();
  });

  it('returns a list of all settings', async () => {
    await initSettings();
    await service.onModuleInit();

    const result = service.listSettings();
    expect(result.length).toEqual(SettingsSeed.length);
  });
});
