import { Test, TestingModule } from '@nestjs/testing';
import { SettingController } from './setting.controller';
import { assignToken } from '@nestjs/core/middleware/utils';
import advanceTimersByTimeAsync = jest.advanceTimersByTimeAsync;
import { NotImplementedException } from '@nestjs/common';

describe('SettingController', () => {
  let controller: SettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingController],
    }).compile();

    controller = module.get<SettingController>(SettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a 201 when valid data is supplied', async () => {
    throw new NotImplementedException();
  });

  it('should return a 400 when an empty setting name is supplied', async () => {
    throw new NotImplementedException();
  });

  it('should return a 400 when no setting name is supplied', async () => {
    throw new NotImplementedException();
  });

  it('should return a 400 when an empty setting value is supplied', async () => {
    throw new NotImplementedException();
  });

  it('should return a 400 when no setting value is supplied', async () => {
    throw new NotImplementedException();
  });

  it('should return an array of settingDTO', async () => {
    throw new NotImplementedException();
  });
});
