import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../categories/entities/category.entity';

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

  @ManyToOne(() => Category, (category) => category.events)
  category: Category;

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
