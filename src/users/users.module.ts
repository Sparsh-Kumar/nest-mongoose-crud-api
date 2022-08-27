import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import LoggerModule from 'src/logger/logger.module';
import { User, UserSchema } from './schemas/user.schema';
import JWTStrategy from './strategy/jwt-strategy';
import UsersController from './users.controller';
import UsersRepository from './users.repository';
import UsersService from './users.service';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, JWTStrategy],
  exports: [UsersService, MongooseModule, UsersRepository],
})
export default class UsersModule {}
