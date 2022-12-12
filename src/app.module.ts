import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import NotificationModule from './notification/notification.module';
import LoggerModule from './logger/logger.module';
import UsersModule from './users/users.module';
import HttpLoggingInterceptor from './logger/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    NotificationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
  ],
})
export default class AppModule {}
