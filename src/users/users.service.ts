import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';

type CreateUserData = Required<Omit<CreateUserDto, 'passwordConfirm'>>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  findOne(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  create(body: CreateUserData) {
    const user = this.repo.create(body);

    return this.repo.save(user);
  }
}
