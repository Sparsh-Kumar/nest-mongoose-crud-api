import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import LoggerModule from './logger/logger.module';
import UsersModule from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule, UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
