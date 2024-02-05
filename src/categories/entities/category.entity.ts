import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EventEntity } from '../../events/events.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => EventEntity, (event) => event.category)
  events: EventEntity[];
}
