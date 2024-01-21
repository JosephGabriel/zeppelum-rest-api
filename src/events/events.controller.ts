import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateEventDto } from './dtos/create-events.dto';
import { EventsService } from './events.service';
import { FindEventsFilterArgs } from './dtos/find-events.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  findAllEvents(@Query() query: FindEventsFilterArgs) {
    return this.eventsService.findAll(query);
  }

  @Post()
  createEvent(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }
}
