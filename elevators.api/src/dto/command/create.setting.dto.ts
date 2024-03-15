import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SettingType } from '../../enums';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsNumber()
  type: SettingType;
}
