import { Test, TestingModule } from '@nestjs/testing';
import { ElevatorController } from './elevator.controller';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ElevatorService } from './elevator.service';
import { mockElevatorService } from '../test/mocks/elevator/mock.elevator.service';
import { LoggerService } from '../utils/logger/logger.service';
import { mockLoggerService } from '../test/mocks';
import { makeRequest } from '../test/helpers';
import {
  mockEmptyElevatorDto,
  mockNegativeCreateElevatorDto,
  mockStringElevatorDto,
  mockValidCreateElevatorDto,
} from '../test/mocks/elevator';
import { Reflector } from '@nestjs/core';

describe('ElevatorController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElevatorController],
      providers: [
        { provide: ElevatorService, useValue: mockElevatorService },
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

  it('should return a 201 when valid data is passed', async () => {
    const response = await makeRequest(
      app,
      'post',
      '/elevator',
      mockValidCreateElevatorDto,
    );
    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body.elevatorNo).toBe(
      mockValidCreateElevatorDto.elevatorNo,
    );
  });

  const checkInvalidResponse = async (message: string, dto: any) => {
    it(message, async () => {
      const response = await makeRequest(app, 'post', '/elevator', dto);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  };

  checkInvalidResponse(
    'should return a 400 when an no floorNo is passed',
    mockEmptyElevatorDto,
  );

  checkInvalidResponse(
    'It should return a 400 when a negative floorNo is passed',
    mockNegativeCreateElevatorDto,
  );

  checkInvalidResponse(
    'It should return a 400 when a string floorNo is passed',
    mockStringElevatorDto,
  );
});
