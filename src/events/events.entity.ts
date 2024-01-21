import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EventType {
  ONLINE = 'Online',
  PRESENTIAL = 'Presential',
}

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: 0,
  })
  rating: number;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.ONLINE,
  })
  type: EventType;

  @Column({
    type: 'timestamp',
  })
  dateStart: Date;

  @Column({
    type: 'timestamp',
  })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
