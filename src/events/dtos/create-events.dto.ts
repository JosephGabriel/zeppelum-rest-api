import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  shortDescription: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  type: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateStart: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  endDate: Date;
}
