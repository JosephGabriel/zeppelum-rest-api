import { Expose, Type } from 'class-transformer';

export class UserPayload {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  lastname: string;
}

export class AuthPayload {
  @Expose()
  token: string;

  @Expose()
  @Type(() => UserPayload)
  user: UserPayload;
}
