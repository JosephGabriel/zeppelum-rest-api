import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { CreateEventDto } from './dtos/create-events.dto';

import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  findAllEvents() {
    return this.eventsService.findAll();
  }

  @Get('/:id')
  findOneEvent(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  createEvent(@Body(new ValidationPipe()) body: CreateEventDto) {
    return this.eventsService.create(body);
  }

  @Delete('/:id')
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
