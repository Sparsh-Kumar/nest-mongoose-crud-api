import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [LoggerModule],
  exports: [UsersService],
})
export class UsersModule {}
