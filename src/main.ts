/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { INestApplication } from '@nestjs/common';
import AppModule from './app.module';
import SentryInterceptor from './interceptors/sentry.interceptor';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new SentryInterceptor());
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  await app.listen(process.env.PORT);
}
bootstrap();
