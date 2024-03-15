import { ConflictException, Injectable } from '@nestjs/common';
import { CreateElevatorDto } from '../dto/command';
import { Elevator } from '../entities/elevator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../utils/logger/logger.service';
import { IElevatorSelection } from '../interfaces';
import { ElevatorCalculatorService } from '../elevator-calculator/elevator-calculator.service';

@Injectable()
export class ElevatorService {
  constructor(
    @InjectRepository(Elevator)
    private readonly elevatorRepo: Repository<Elevator>,
    private readonly loggerService: LoggerService,
    private readonly elevatorCalculatorService: ElevatorCalculatorService,
  ) {}

  public async listElevators(relations: string[]): Promise<Elevator[]> {
    return this.elevatorRepo.find({ relations: relations });
  }

  public async allocateElevator(floorNo: number): Promise<IElevatorSelection> {
    const elevatorRelations = [
      'currentFloor',
      'queue',
      'queue.floorTo',
      'queue.floorFrom',
    ];
    const elevators = await this.listElevators(elevatorRelations);
    if (!elevators) throw new Error('No Elevators found');

    const selection = this.elevatorCalculatorService.calculateAvailability(
      elevators,
      floorNo,
    );

    return this.elevatorCalculatorService.pickQuickest(selection);
  }

  public async createElevator(data: CreateElevatorDto): Promise<Elevator> {
    await this.validateDuplicates(data.elevatorNo);
    const elevator: Elevator = this.elevatorRepo.create({
      elevatorNo: data.elevatorNo,
      currentFloorId: data.currentFloorId,
    });
    return await this.elevatorRepo.save(elevator);
  }

  private async validateDuplicates(elevatorNo: number) {
    const elevator = await this.elevatorRepo.findOneBy({ elevatorNo });

    if (elevator) {
      const msg = `elevator ${elevatorNo} already exists`;
      this.loggerService.debug(msg);
      throw new ConflictException(msg);
    }
  }
}
