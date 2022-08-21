import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import LoggerModule from './logger/logger.module';
import UsersModule from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule, UsersModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
