import { Inject, Injectable, Scope } from '@nestjs/common';
import winston from 'winston';
import { WINSTON_LOGGER } from './constants';

/**
 * @ModifiedBy : Sparsh Kumar
 * @Description : We are making a dynamic logger therefore,
 * we want to create a new instance of logger whenever it DI injection came into use.
 */

// TODO: Log warnings and errors into Sentry
@Injectable()
export default class LoggerService {
  constructor(
    @Inject(WINSTON_LOGGER) private readonly winstonLogger: winston.Logger,
  ) {}

  public logInfo(message: string): void {
    this.winstonLogger.info({
      message: `INFO - ${message}`,
    });
  }

  public logWarning(message: string): void {
    this.winstonLogger.warn({
      message: `WARN - ${message}`,
    });
  }

  public logError(message: string): void {
    this.winstonLogger.error({
      message: `ERROR - ${message}`,
    });
  }
}
