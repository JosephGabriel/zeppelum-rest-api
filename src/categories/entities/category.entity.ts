import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Event } from '../../events/entities/events.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}
