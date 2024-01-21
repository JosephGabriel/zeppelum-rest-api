import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventEntity } from './events.entity';

import { CreateEventDto } from './dtos/create-events.dto';
import { FindEventsFilterArgs } from './dtos/find-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity) private repo: Repository<EventEntity>,
  ) {}

  async create(data: CreateEventDto): Promise<CreateEventDto> {
    const event = await this.repo.create(data);

    return this.repo.save(event);
  }

  findOne(id: string): Promise<EventEntity> {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  findAll(filter: FindEventsFilterArgs) {
    return this.repo.find({
      where: { ...filter },
    });
  }
}
