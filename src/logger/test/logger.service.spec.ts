import { Test, TestingModule } from '@nestjs/testing';
import { LooseObject } from 'src/notification/types';
import winston from 'winston';
import WINSTON_LOGGER from '../constants';
import LoggerService from '../logger.service';

describe('Logger Service [Unit Test]', function () {
  let loggerService: LoggerService;
  let loggingMessage: string = 'Logged';
  let winstonLogger: winston.Logger;
  beforeEach(async function () {
    const loggerModule: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: WINSTON_LOGGER,
          useFactory: () => ({
            info: jest.fn((): void | null => null),
            warn: jest.fn((): void | null => null),
            error: jest.fn((): void | null => null),
          }),
        },
      ],
    }).compile();
    loggerService = loggerModule.get<LoggerService>(LoggerService);
    winstonLogger = (loggerService as LooseObject).winstonLogger;
  });
  test('logInfo', async function () {
    loggerService.logInfo(loggingMessage);
    expect(winstonLogger.info).toHaveBeenCalled();
  });
  test('logWarning', async function () {
    loggerService.logWarning(loggingMessage);
    expect(winstonLogger.warn).toHaveBeenCalled();
  });
  test('logError', async function () {
    loggerService.logError(loggingMessage);
    expect(winstonLogger.error).toHaveBeenCalled();
  });
});
