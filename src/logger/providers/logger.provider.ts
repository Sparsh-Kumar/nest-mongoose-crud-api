import { FormatWrap, TransformableInfo } from 'logform';
import {
  createLogger,
  transports,
  LoggerOptions,
  Logger,
  format,
} from 'winston';
import { WINSTON_LOGGER } from '../constants';
import NODE_ENV_TYPES from '../types';

// TODO: Make use of Dtos to validate NODE_ENV
const setMetaData = (
  NODE_ENV: NODE_ENV_TYPES = NODE_ENV_TYPES.DEVELOPMENT,
): FormatWrap => format((info): TransformableInfo => {
  info.NODE_ENV = NODE_ENV;
  return info;
});

export const loggerProvider = [
  {
    provide: WINSTON_LOGGER,
    useFactory: async (): Promise<Logger> => {
      const metaData: FormatWrap = setMetaData(
        <NODE_ENV_TYPES>process.env.NODE_ENV,
      );
      const loggerOptions: LoggerOptions = {
        format: format.combine(
          metaData(),
          format.timestamp(),
          format.prettyPrint(),
          format.json(),
        ),
        transports: [
          new transports.Console(),
          new transports.File({
            filename: 'combined.log',
          }),
        ],
      };
      return createLogger(loggerOptions);
    },
  },
];
