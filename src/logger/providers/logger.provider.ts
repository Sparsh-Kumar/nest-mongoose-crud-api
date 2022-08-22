/* eslint-disable no-param-reassign */
/* eslint-disable import/no-named-as-default */
import { FormatWrap, TransformableInfo } from 'logform';
import {
  createLogger,
  transports,
  LoggerOptions,
  Logger,
  format,
} from 'winston';
import WINSTON_LOGGER from '../constants';
import NodeEnvTypes from '../types';

// TODO: Make use of Dtos to validate NODE_ENV
const setMetaData = (
  NODE_ENV: NodeEnvTypes = NodeEnvTypes.DEVELOPMENT,
): FormatWrap => format((info): TransformableInfo => {
  info.NODE_ENV = NODE_ENV;
  return info;
});

const loggerProvider = [
  {
    provide: WINSTON_LOGGER,
    useFactory(): Logger {
      const metaData: FormatWrap = setMetaData(
        <NodeEnvTypes>process.env.NODE_ENV,
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

export default loggerProvider;
