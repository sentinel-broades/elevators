import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFloorDto {
  @IsNotEmpty()
  @IsNumber()
  floorNo: number;
}
