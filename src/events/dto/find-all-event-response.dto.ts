import { Expose } from 'class-transformer';

export class EventDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  shortDescription: string;

  @Expose()
  price: number;

  @Expose()
  rating: number;
}
