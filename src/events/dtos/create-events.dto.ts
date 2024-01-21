import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  type: string;

  @IsDate()
  dateStart: Date;

  @IsDate()
  endDate: Date;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
