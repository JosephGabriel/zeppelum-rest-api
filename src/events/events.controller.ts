import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateEventDto } from './dto/create-events.dto';
import { EventDto } from './dto/find-all-event-response.dto';

import { EventsService } from './events.service';

import { Serialize } from '../interceptors/serialize.interceptor';

import { JwtAuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../users/entities/users.entity';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Serialize(EventDto)
  @Get()
  findAllEvents() {
    return this.eventsService.findAll();
  }

  @Get('/:id')
  findOneEvent(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Serialize(EventDto)
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  createEvent(@Body() body: CreateEventDto, @CurrentUser() currentUser: User) {
    return this.eventsService.create(body, currentUser);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
