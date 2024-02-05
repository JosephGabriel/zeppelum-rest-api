import { IsDate, IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';

import { EventType } from '../entities/events.entity';

export class FindEventsFilterDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @Min(0)
  @Max(5)
  rating: number;

  @IsEnum(EventType)
  type: EventType;

  @IsDate()
  dateStart: Date;

  @IsDate()
  endDate: Date;

  @IsDate()
  createdAt: Date;
}
