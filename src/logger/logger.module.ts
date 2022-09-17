import { Module } from '@nestjs/common';
import LoggerService from './logger.service';
import loggerProvider from './providers/logger.provider';

@Module({
  providers: [LoggerService, ...loggerProvider],
  exports: [LoggerService],
})
export default class LoggerModule {}
