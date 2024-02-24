import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Event } from './entities/events.entity';
import { User } from '../users/entities/users.entity';

import { CreateEventDto } from './dto/create-events.dto';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private repo: Repository<Event>) {}

  async create(data: CreateEventDto, admin: User): Promise<CreateEventDto> {
    const event = await this.repo.create({
      ...data,
      admin,
    });

    return this.repo.save(event);
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException('no event found');
    }

    return event;
  }

  findAll(): Promise<Event[]> {
    return this.repo.find();
  }

  async deleteEvent(id: string): Promise<DeleteResult> {
    const event = await this.findOne(id);

    return this.repo.delete(event.id);
  }
}
