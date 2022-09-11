import {
  Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler,
} from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import LoggerService from 'src/logger/logger.service';
import {
  LooseExceptionsObject, LooseObject, LooseRequestObject, MethodTypes,
} from '../types';

@Injectable()
export default class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly _logger: LoggerService) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler<LooseObject>,
  ): Observable<LooseObject> | Promise<Observable<LooseObject>> {
    const now: number = Date.now();
    const request: LooseRequestObject = context.switchToHttp().getRequest();
    const response: LooseObject = context.switchToHttp().getResponse();
    const { method } = request;
    const url: string = request.originalUrl;

    return next
      .handle()
      .pipe(
        tap((): void => {
          const delay: number = Date.now() - now;
          this._logger.logInfo(
            HttpLoggingInterceptor.createLogMessage(
              <number>response.statusCode,
              method,
              url,
              delay,
            ),
          );
        }),
        catchError((exception: LooseExceptionsObject): Observable<never> => {
          let httpStatus: number;
          switch (true) {
            case exception instanceof HttpException:
              httpStatus = exception.getStatus();
              break;
            case exception instanceof TokenExpiredError:
              httpStatus = <number>HttpStatus.UNAUTHORIZED;
              break;
            default:
              httpStatus = <number>HttpStatus.INTERNAL_SERVER_ERROR;
              break;
          }
          const delay: number = Date.now() - now;
          this._logger.logError(
            HttpLoggingInterceptor.createLogMessage(
              httpStatus,
              method,
              url,
              delay,
            ),
          );
          return throwError(exception);
        }),
      );
  }

  private static createLogMessage(
    httpStatusCode: number,
    method: MethodTypes,
    url: string,
    delay: number,
  ): string {
    return `${httpStatusCode} || [${method}] ${url} - ${delay} ms.`;
  }
}
