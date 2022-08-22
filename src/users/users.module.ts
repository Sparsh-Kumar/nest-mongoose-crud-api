import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import LoggerModule from 'src/logger/logger.module';
import { User, UserSchema } from './schemas/user.schema';
import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
  ])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export default class UsersModule {}
