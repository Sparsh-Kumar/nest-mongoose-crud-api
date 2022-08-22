import { Controller } from '@nestjs/common';
import LoggerService from '../logger/logger.service';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(
    private _loggerService: LoggerService,
    private _userService: UsersService,
  ) {}
}
