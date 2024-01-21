import { IsDate, IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';

import { EventType } from '../events.entity';

export class FindEventsFilterArgs {
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
