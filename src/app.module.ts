import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DatabaseModule from './database/database.module';
import LoggerModule from './logger/logger.module';
import UsersModule from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
