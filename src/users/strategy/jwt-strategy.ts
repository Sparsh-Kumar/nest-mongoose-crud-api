import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDocument } from '../schemas/user.schema';
import { DecodedJWTPayload } from '../types';
import UsersService from '../users.service';

@Injectable()
export default class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private _userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(
    payload: DecodedJWTPayload,
  ): Promise<UserDocument> | never {
    const { id }: { id: string } = payload;
    const userDetails: UserDocument | void = await this._userService.findById(id);
    if (!userDetails) {
      throw new UnauthorizedException();
    }
    return userDetails;
  }
}
