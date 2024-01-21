import { Expose, Type } from 'class-transformer';

export class UserPayload {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;
}

export class AuthPayload {
  @Expose()
  token: string;

  @Expose()
  @Type(() => UserPayload)
  user: UserPayload;
}
