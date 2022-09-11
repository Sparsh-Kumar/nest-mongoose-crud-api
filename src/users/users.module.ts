import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import NotificationModule from 'src/notification/notification.module';
import { User, UserSchema } from './schemas/user.schema';
import JWTStrategy from './strategy/jwt-strategy';
import UsersController from './users.controller';
import UsersRepository from './users.repository';
import UsersService from './users.service';

@Module({
  imports: [
    NotificationModule,
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
