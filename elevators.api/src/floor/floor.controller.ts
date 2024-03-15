import { Body, Controller, Post } from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from '../dto/command/';
import { LoggerService } from '../utils/logger/logger.service';

@Controller('floor')
export class FloorController {
  constructor(
    private readonly floorService: FloorService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post()
  async createFloor(@Body() data: CreateFloorDto) {
    try {
      return await this.floorService.createFloor(data);
    } catch (error) {
      this.loggerService.createEntityError(error, 'floor');
    }
  }
}
