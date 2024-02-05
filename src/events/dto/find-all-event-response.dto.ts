import { Expose } from 'class-transformer';

export class FindAllEventsDto {
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
