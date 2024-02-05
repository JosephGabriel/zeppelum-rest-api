import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { UserEntity } from './users/users.entity';

import { AuthModule } from './auth/auth.module';

import { EventsModule } from './events/events.module';
import { EventEntity } from './events/events.entity';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DATABASE_NAME'),
        synchronize: true,
        entities: [UserEntity, EventEntity],
      }),
    }),
    UsersModule,
    AuthModule,
    EventsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
