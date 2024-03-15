import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Elevator } from './elevator.entity';
import { Floor } from './floor.entity';

@Entity()
export class ElevatorEvent extends BaseEntity {
  @Column()
  time: number;

  @Column()
  floorFromId: number;

  @Column()
  floorToId: number;

  @Column()
  elevatorId: number;

  @ManyToOne(() => Elevator)
  @JoinColumn({
    name: 'elevatorId',
    foreignKeyConstraintName: 'FK_elevatorEvent_ElevatorId',
  })
  elevator: Elevator;

  @ManyToOne(() => Floor)
  @JoinColumn({
    name: 'floorFromId',
    foreignKeyConstraintName: 'FK_elevatorEvent_FloorFromId',
  })
  floorFrom: Floor;

  @ManyToOne(() => Floor)
  @JoinColumn({
    name: 'floorToId',
    foreignKeyConstraintName: 'FK_elevatorEvent_FloorToId',
  })
  floorTo: Floor;
}
