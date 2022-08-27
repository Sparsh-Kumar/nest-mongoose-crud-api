import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import SignInDto from './dtos/signin.dto';
import SignUpDto from './dtos/signup.dto';
import { UserDocument } from './schemas/user.schema';
import { LooseObject, TokenDetails, UserDocWithSchemaMethods } from './types';
import UsersRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(
    private _userRepository: UsersRepository,
    private _jwtService: JwtService,
  ) { }

  public async findOne(filters: LooseObject): Promise<UserDocument> {
    return this._userRepository.findOne(filters);
  }

  public async findAll(filters: LooseObject): Promise<UserDocument[]> {
    return this._userRepository.findAll(filters);
  }

  public async findById(id: string): Promise<UserDocument> {
    return this._userRepository.findById(id);
  }

  public async signUp(signUpDto: SignUpDto): Promise<UserDocument> {
    return this._userRepository.createUser(signUpDto);
  }

  public async signIn(signInDto: SignInDto): Promise<TokenDetails> {
    const { username, password }: { username: string, password: string } = signInDto;
    const existingUser: UserDocWithSchemaMethods = <UserDocWithSchemaMethods> await this.findOne({
      username,
    });
    if (!existingUser || !(await existingUser.validatePassword(password))) {
      throw new UnauthorizedException('Invalid username / password !, please try again.');
    }
    const accessToken: string = this._jwtService.sign(
      <{ _id: string }>{
        _id: <string>existingUser._id,
      },
      <{ secret: string, expiresIn: number }>{
        secret: process.env.JWT_SECRET,
        expiresIn: +process.env.AUTH_JWT_TIME,
      },
    );
    return { accessToken };
  }
}
