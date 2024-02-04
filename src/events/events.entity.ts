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
  image: string;

  @Column()
  title: string;

  @Column()
  shortDescription: string;

  @Column()
  description: string;

  @Column({
    default: 0,
  })
  rating: number;

  @Column()
  price: number;

  @Column({
    default: 'ONLINE',
  })
  type: string;

  @Column()
  dateStart: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
