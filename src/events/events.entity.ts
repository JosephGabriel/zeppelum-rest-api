import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { faker } from '@faker-js/faker';

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

  @BeforeInsert()
  createRandonImage() {
    this.image = faker.image.urlLoremFlickr();
  }
}
