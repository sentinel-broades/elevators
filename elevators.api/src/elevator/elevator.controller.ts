import { Body, Controller, Post } from '@nestjs/common';
import { ElevatorService } from './elevator.service';
import { LoggerService } from '../utils/logger/logger.service';
import { CreateElevatorDto } from '../dto/command';

@Controller('elevator')
export class ElevatorController {
  constructor(
    private readonly elevatorService: ElevatorService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post()
  async createElevator(@Body() data: CreateElevatorDto) {
    try {
      return await this.elevatorService.createElevator(data);
    } catch (error) {
      this.loggerService.createEntityError(error, 'elevator');
    }
  }
}
