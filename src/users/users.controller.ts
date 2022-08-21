import { Controller } from '@nestjs/common';
import LoggerService from '../logger/logger.service';

@Controller('users')
export default class UsersController {
  constructor(private _loggerService: LoggerService) {}
}
