import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateElevatorDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  elevatorNo: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  currentFloorId: number;
}
