import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { TokenExpiredError } from 'jsonwebtoken';
import * as Sentry from '@sentry/node';
import { LooseExceptionsObject, LooseObject } from './types';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly _httpAdapterHost: HttpAdapterHost<AbstractHttpAdapter<any, any, any>>,
  ) { }

  catch(
    exception: LooseExceptionsObject,
    host: ArgumentsHost,
  ): void {
    Sentry.captureException(exception);
    const {
      httpAdapter,
    }: {
      httpAdapter: AbstractHttpAdapter<any, any, any>
    } = this._httpAdapterHost;
    const ctx: HttpArgumentsHost = host.switchToHttp();
    let { response } = exception;
    let httpStatus: number;
    switch (true) {
      case exception instanceof HttpException:
        httpStatus = exception.getStatus();
        break;
      case exception instanceof TokenExpiredError:
        httpStatus = <number>HttpStatus.UNAUTHORIZED;
        response = <LooseObject> new UnauthorizedException('JWT Expired / Malformed.').getResponse();
        break;
      default:
        httpStatus = <number>HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }
    httpAdapter.reply(ctx.getResponse(), response, httpStatus);
  }
}
