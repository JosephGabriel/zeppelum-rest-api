import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { EventsService } from './events.service';
import { UsersService } from '../users/users.service';

import { EventsController } from './events.controller';

import { Event } from './entities/events.entity';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User])],
  providers: [EventsService, JwtService, ConfigService, UsersService],
  controllers: [EventsController],
})
export class EventsModule {}
