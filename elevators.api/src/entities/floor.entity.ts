import { Column, Entity, OneToMany } from 'typeorm';
import { ElevatorEvent } from './elevator-event.entity';
import { BaseEntity } from './base.entity';
import { Elevator } from './elevator.entity';
import { ElevatorJob } from './elevator.job.entity';
@Entity()
export class Floor extends BaseEntity {
  @Column({ unique: true })
  floorNo: number;

  @OneToMany(() => ElevatorEvent, (elevatorEvent) => elevatorEvent.floorFrom)
  floorFromEvents: ElevatorEvent[];

  @OneToMany(() => ElevatorEvent, (elevatorEvent) => elevatorEvent.floorTo)
  floorToEvents: ElevatorEvent[];

  @OneToMany(() => ElevatorEvent, (elevatorQueue) => elevatorQueue.floorFrom)
  floorFromQueue: ElevatorJob[];

  @OneToMany(() => ElevatorEvent, (elevatorQueue) => elevatorQueue.floorTo)
  floorToQueue: ElevatorJob[];

  @OneToMany(() => Elevator, (elevator) => elevator.currentFloor)
  elevatorsOnThisFloor: Elevator[];
}
