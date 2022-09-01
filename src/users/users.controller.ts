import {
  Body, Controller, Get, Param, Post, UsePipes, ValidationPipe,
} from '@nestjs/common';
import LoggerService from '../logger/logger.service';
import SignInDto from './dtos/signin.dto';
import SignUpDto from './dtos/signup.dto';
import { UserDocument } from './schemas/user.schema';
import { TokenDetails } from './types';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(
    private _loggerService: LoggerService,
    private _userService: UsersService,
  ) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  public async signUp(@Body() signUpDto: SignUpDto): Promise<void> | never {
    await this._userService.createMagicLink(signUpDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  public async signIn(@Body() signInDto: SignInDto): Promise<TokenDetails> {
    return this._userService.signIn(signInDto);
  }

  @Get(':token')
  public async createUser(
    @Param('token') regToken: string,
  ): Promise<UserDocument> | never {
    return this._userService.createUserByRegToken(regToken);
  }
}
