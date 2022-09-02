import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import EmailService from 'src/notification/email.service';
import { SenderEmailBody } from 'src/notification/types';
import SignInDto from './dtos/signin.dto';
import SignUpDto from './dtos/signup.dto';
import { UserDocument } from './schemas/user.schema';
import { LooseObject, TokenDetails, UserDocWithSchemaMethods } from './types';
import UsersRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(
    private readonly _userRepository: UsersRepository,
    private readonly _jwtService: JwtService,
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

  public async createUser(signUpDto: SignUpDto): Promise<UserDocument> {
    return this._userRepository.createUser(signUpDto);
  }

  // TODO: You can select different value for 'secret' and 'expiresIn' for registration Token.
  public async createMagicLink(signUpDto: SignUpDto): Promise<void> | never {
    const {
      username,
      email,
    }: {
      username: string,
      email: string
    } = signUpDto;
    const existingUser: UserDocument | void = await this.findOne({
      $or: [
        { username },
        { email },
      ],
    });
    if (existingUser) {
      throw new BadRequestException('User with provided username / email already exists');
    }
    const registrationToken: string = this._jwtService.sign(
      signUpDto,
      <{ secret: string, expiresIn: number }>{
        secret: process.env.JWT_SECRET,
        expiresIn: +process.env.AUTH_JWT_TIME,
      },
    );
    const emailBody: SenderEmailBody = {
      to: email,
      from: process.env.ORGANISATION_EMAIL,
      subject: 'Complete Account Registration',
      text: 'please complete your registration by clicking the link below.',
      html: `<p>please complete your registration by clicking the link below.<br><a href='${process.env.WEB_APP_HOST}/users/${registrationToken}'>Click Here</a></p>`,
    };
    await EmailService.sendEmail(emailBody);
  }

  public async createUserByRegToken(regToken: string): Promise<UserDocument> | never {
    const decodedUser: SignUpDto = this._jwtService.verify(
      regToken,
      <{ secret: string }>{
        secret: process.env.JWT_SECRET,
      },
    );
    return this._userRepository.createUser(decodedUser);
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
