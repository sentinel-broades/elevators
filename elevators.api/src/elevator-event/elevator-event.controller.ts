import { Body, Controller, Post } from '@nestjs/common';
import { ElevatorEventService } from './elevator-event.service';
import { LoggerService } from '../utils/logger/logger.service';
import { RequestElevatorDto } from '../dto/command';
import { error } from 'winston';

@Controller('elevator-event')
export class ElevatorEventController {
  constructor(
    private readonly elevatorEventService: ElevatorEventService,
    private readonly loggerService: LoggerService,
  ) {
    loggerService.setContext('ElevatorEventController');
  }

  @Post('/single')
  async requestElevatorSingle(@Body() data: RequestElevatorDto) {
    try {
      return await this.elevatorEventService.requestElevator(data);
    } catch (error) {
      this.loggerService.createEntityError(error, 'elevator request');
    }
  }

  @Post('/batch')
  async requestElevatorBatch(@Body() data: RequestElevatorDto[]) {
    try {
      const results = [];
      for (const item of data) {
        const result = await this.elevatorEventService.requestElevator(item);
        results.push(result);
      }
      return results;
    } catch (error) {
      this.loggerService.createEntityError(error, 'elevator request');
    }
  }
}
