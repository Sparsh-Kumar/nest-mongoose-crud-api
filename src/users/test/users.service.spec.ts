import { Test, TestingModule } from '@nestjs/testing';
import UsersService from '../users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import UsersRepository from '../users.repository';
import NotificationModule from '../../notification/notification.module';
import SignUpDto from '../dtos/signup.dto';
import SignInDto from '../dtos/signin.dto';
import UserHelper from './helpers/user-helper';
import { LooseObject, TokenDetails } from '../types';
import { User } from '../schemas/user.schema';
import { BadRequestException } from '@nestjs/common';

describe('Users Service [Unit Test]', function() {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let jwtService: JwtService;
  beforeEach(async function() {
    const userModule: TestingModule = await Test.createTestingModule({
      imports: [
        NotificationModule,
      ],
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: () => ({
            findOne: jest.fn(async() => {
              const randomUser: LooseObject = <LooseObject>UserHelper.generateUser();
              randomUser.validatePassword = function(password: string) {
                return true;
              }
              return randomUser;
            }),
            findAll: jest.fn(async() => [ UserHelper.generateUser() ]),
            findById: jest.fn(async() => UserHelper.generateUser()),
            createUser: jest.fn(async() => UserHelper.generateUser()),
          }),
        },
        {
          provide: JwtService,
          useFactory: () => ({
            verify: jest.fn((tokenValue: string, payload: string | object | Buffer): boolean => true),
            sign: jest.fn((payload: string | object | Buffer, options?: JwtSignOptions): boolean | string => true),
          }),
        },
      ],
    }).compile();
    usersService = userModule.get<UsersService>(UsersService);
    usersRepository = userModule.get<UsersRepository>(UsersRepository);
    jwtService = userModule.get<JwtService>(JwtService);
  });
  test('findOne', async function() {
    const foundUser: User = await usersService.findOne({});
    expect(foundUser).toHaveProperty('username');
    expect(foundUser).toHaveProperty('email');
    expect(foundUser).toHaveProperty('password');
    expect(foundUser).toHaveProperty('salt');
    expect(usersRepository.findOne).toHaveBeenCalled();
  });
  test('findAll', async function() {
    let foundUser: User;
    const foundUsers: User [] = await usersService.findAll({});
    for(foundUser of foundUsers) {
      expect(foundUser).toHaveProperty('username');
      expect(foundUser).toHaveProperty('email');
      expect(foundUser).toHaveProperty('password');
      expect(foundUser).toHaveProperty('salt');
    }
    expect(usersRepository.findAll).toHaveBeenCalled();
  });
  test('findById', async function() {
    let userId: string = 'userId';
    const foundUser: User = await usersService.findById(userId);
    expect(foundUser).toHaveProperty('username');
    expect(foundUser).toHaveProperty('email');
    expect(foundUser).toHaveProperty('password');
    expect(foundUser).toHaveProperty('salt');
    expect(usersRepository.findById).toHaveBeenCalled();
  });
  test('createMagicLink - User Already Exists.', async function() {
    const userSignUpBody: SignUpDto = <SignUpDto>UserHelper.generateCreds();
    await expect(usersService.createMagicLink(userSignUpBody)).rejects.toThrowError(BadRequestException);
  });
  test('createMagicLink - User Not Exists Already.', async function() {
    // TODO: Figure out the way to run this test case.
  });
  test('createUserByRegToken', async function() {
    const registrationToken: string = UserHelper.generateRandomString();
    await usersService.createUserByRegToken(registrationToken);
    expect(jwtService.verify).toHaveBeenCalled();
    expect(usersRepository.createUser).toHaveBeenCalled();
  });
  test('signIn', async function() {
    const userSignInBody: SignInDto = <SignInDto>UserHelper.generateCreds();
    const tokenDetails: TokenDetails = <TokenDetails>await usersService.signIn(userSignInBody);
    expect(jwtService.sign).toHaveBeenCalled();
    expect(usersRepository.findOne).toHaveBeenCalled();
  });
  test('signIn - Invalid Username / Password', async function() {
    // TODO: Figure out the way to run this test case.
  });
});
