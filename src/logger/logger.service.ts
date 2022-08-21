import { Inject, Injectable, Scope } from '@nestjs/common';
import winston from 'winston';
import { WINSTON_LOGGER } from './constants';

/**
 * @ModifiedBy : Sparsh Kumar
 * @Description : We are making a dynamic logger therefore,
 * we want to create a new instance of logger whenever it DI injection came into use.
 */

// TODO: Log warnings and errors into Sentry
@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService {
  constructor(
    @Inject(WINSTON_LOGGER) private readonly winstonLogger: winston.Logger,
  ) {}

  logInfo(message: string): void {
    this.winstonLogger.info({
      message,
    });
  }

  logDebug(message: string): void {
    this.winstonLogger.debug({
      message,
    });
  }

  logWarning(message: string): void {
    this.winstonLogger.warn({
      message,
    });
  }

  logError(message: string): void {
    this.winstonLogger.error({
      message,
    });
  }
}
