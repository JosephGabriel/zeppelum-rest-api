import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CategoriesService } from './categories.service';
import { UsersService } from '../users/users.service';

import { CategoriesController } from './categories.controller';

import { Category } from './entities/category.entity';
import { User } from '../users/entities/users.entity';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, UsersService, JwtService, ConfigService],
  imports: [TypeOrmModule.forFeature([Category, User])],
})
export class CategoriesModule {}
