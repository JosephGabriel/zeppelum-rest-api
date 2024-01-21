import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

import { EventType } from '../events.entity';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsEnum(EventType)
  type: EventType;

  @IsDate()
  dateStart: Date;

  @IsDate()
  endDate: Date;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
