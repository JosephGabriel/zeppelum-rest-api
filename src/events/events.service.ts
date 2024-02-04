import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { EventEntity } from './events.entity';

import { CreateEventDto } from './dtos/create-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity) private repo: Repository<EventEntity>,
  ) {}

  async create(data: CreateEventDto): Promise<CreateEventDto> {
    const event = await this.repo.create(data);

    return this.repo.save(event);
  }

  async findOne(id: string): Promise<EventEntity> {
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

  findAll(): Promise<EventEntity[]> {
    return this.repo.find();
  }

  async deleteEvent(id: string): Promise<DeleteResult> {
    const event = await this.findOne(id);

    return this.repo.delete(event.id);
  }
}
