import { User } from './src/users/entities/users.entity';

declare module 'express' {
  interface Request {
    currentUser?: User;
  }
}
