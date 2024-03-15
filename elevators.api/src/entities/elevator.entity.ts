import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ElevatorEvent } from './elevator-event.entity';
import { Floor } from './floor.entity';
import { ElevatorJob } from './elevator.job.entity';

@Entity()
export class Elevator extends BaseEntity {
  @Column({ unique: true })
  elevatorNo: number;

  @Column()
  currentFloorId: number;

  @OneToMany(() => ElevatorEvent, (elevatorEvent) => elevatorEvent.elevator)
  events: ElevatorEvent[];

  @OneToMany(() => ElevatorJob, (elevatorQueue) => elevatorQueue.elevator)
  queue: ElevatorJob[];

  @ManyToOne(() => Floor)
  @JoinColumn({
    name: 'currentFloorId',
    foreignKeyConstraintName: 'FK_elevator_CurrentFloor',
  })
  currentFloor: Floor;
}
