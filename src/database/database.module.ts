import { Module } from '@nestjs/common';
import databaseProvider from './providers/database.provider';

@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export default class DatabaseModule {}
