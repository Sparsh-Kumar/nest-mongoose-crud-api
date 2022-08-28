/* eslint-disable class-methods-use-this */
import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import * as Sentry from '@sentry/node';

@Injectable()
export default class SentryInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        tap(null, (exception) => {
          Sentry.captureException(exception);
        }),
      );
  }
}
