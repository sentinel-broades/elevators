import { CreateSettingDto } from '../../../dto/command';

export const mockSettingRepo = {
  create: jest.fn().mockImplementation((data) => data),
  save: jest.fn().mockImplementation((data: CreateSettingDto) => {}),
  findOneBy: jest.fn(),
  find: jest.fn(),
};
