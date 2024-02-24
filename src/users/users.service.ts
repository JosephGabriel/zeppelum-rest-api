import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/users.entity';

import { CreateUserDto } from './dto/create-user.dto';

type CreateUserData = Required<Omit<CreateUserDto, 'passwordConfirm'>>;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  create(body: CreateUserData) {
    const user = this.repo.create(body);

    return this.repo.save(user);
  }
}
