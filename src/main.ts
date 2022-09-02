/* eslint-disable @typescript-eslint/no-floating-promises */
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { INestApplication } from '@nestjs/common';
import AppModule from './app.module';
import AllExceptionsFilter from './filters/exception.filter';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  await app.listen(process.env.PORT);
}
bootstrap();
