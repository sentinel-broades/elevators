import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';
import { SettingType } from '../enums';

@Entity()
export class Setting extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  value: string;

  @Column()
  type: SettingType;
}
