import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFloorDto } from '../dto/command';
import { Floor } from '../entities/floor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../utils/logger/logger.service';

@Injectable()
export class FloorService {
  constructor(
    @InjectRepository(Floor)
    private readonly floorRepo: Repository<Floor>,
    private readonly loggerService: LoggerService,
  ) {}

  public async listFloors(): Promise<Floor[]> {
    return await this.floorRepo.find();
  }
  public async getFloor(floorNo: number): Promise<Floor> {
    const floor = await this.floorRepo.findOneBy({ floorNo });

    if (!floor) {
      const msg = `can't find floor ${floorNo}`;
      this.loggerService.error(msg);
      throw new NotFoundException(msg);
    }

    return floor;
  }

  public async createFloor(data: CreateFloorDto): Promise<Floor> {
    await this.validateDuplicates(data.floorNo);
    const floor: Floor = this.floorRepo.create({ floorNo: data.floorNo });
    return await this.floorRepo.save(floor);
  }

  private async validateDuplicates(floorNo: number) {
    const floor = await this.floorRepo.findOneBy({ floorNo });

    if (floor) {
      const msg = `floor ${floorNo} already exists`;
      this.loggerService.debug(msg);
      throw new ConflictException(msg);
    }
  }
}
