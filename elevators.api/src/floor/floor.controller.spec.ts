import { Test, TestingModule } from '@nestjs/testing';
import { FloorController } from './floor.controller';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { FloorService } from './floor.service';
import { LoggerService } from '../utils/logger/logger.service';
import {
  mockEmptyFloorDto,
  mockFloorService,
  mockLoggerService,
  mockNegativeCreateFloorDto,
  mockStringFloorDto,
  mockValidCreateFloorDto,
} from '../test/mocks';
import { Reflector } from '@nestjs/core';
import { makeRequest } from '../test/helpers';
import { CreateFloorDto } from '../dto/command/';

describe('FloorController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloorController],
      providers: [
        { provide: FloorService, useValue: mockFloorService },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    await app.init();
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  const checkValidResponse = async (message: string, dto: CreateFloorDto) => {
    it(message, async () => {
      const response = await makeRequest(app, 'post', '/floor', dto);
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.floorNo).toBe(dto.floorNo);
    });
  };

  const checkInvalidResponse = async (message: string, dto: any) => {
    it(message, async () => {
      const response = await makeRequest(app, 'post', '/floor', dto);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  };

  checkValidResponse(
    'should return a 201 when a positive floorNo is passed',
    mockValidCreateFloorDto,
  );
  checkValidResponse(
    'should return a 201 when a negative floorNo is passed',
    mockNegativeCreateFloorDto,
  );

  checkInvalidResponse(
    'should return a 400 when no floorNo is passed',
    mockEmptyFloorDto,
  );
  checkInvalidResponse(
    'should return a 400 when a floorNo that is a string is passed',
    mockStringFloorDto,
  );
});
