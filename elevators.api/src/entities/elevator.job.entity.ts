import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Floor } from './floor.entity';
import { Elevator } from './elevator.entity';
import { JobState } from '../enums';

@Entity()
export class ElevatorJob extends BaseEntity {
  @Column()
  time: number;

  @Column()
  elevatorId: number;

  @Column()
  floorFromId: number;

  @Column()
  floorToId: number;

  @Column()
  jobState: JobState;

  @ManyToOne(() => Elevator)
  @JoinColumn({
    name: 'elevatorId',
    foreignKeyConstraintName: 'FK_elevatorQueue_ElevatorId',
  })
  elevator: Elevator;

  @ManyToOne(() => Floor)
  @JoinColumn({
    name: 'floorFromId',
    foreignKeyConstraintName: 'FK_elevatorQueue_FloorFromId',
  })
  floorFrom: Floor;

  @ManyToOne(() => Floor)
  @JoinColumn({
    name: 'floorToId',
    foreignKeyConstraintName: 'FK_elevatorQueue_FloorToId',
  })
  floorTo: Floor;
}
