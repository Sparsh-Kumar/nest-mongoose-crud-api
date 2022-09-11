import { Test, TestingModule } from '@nestjs/testing';
import UsersController from '../users.controller';
import UsersService from '../users.service';
import NotificationModule from '../../notification/notification.module';
import SignUpDto from '../dtos/signup.dto';
import SignInDto from '../dtos/signin.dto';
import UserHelper from './helpers/user-helper';
import { TokenDetails } from '../types';
import { User } from '../schemas/user.schema';

describe('Users Controller [Unit Test]', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async function () {
    const userModule: TestingModule = await Test.createTestingModule({
      imports: [
        NotificationModule,
      ],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useFactory: () => ({
            createMagicLink: jest.fn(async () => null),
            createUserByRegToken: jest.fn(async () => UserHelper.generateUser()),
            signIn: jest.fn(async () => {
              return { accessToken: 'accessTokenValue' }
            }),
          }),
        },
      ],
    }).compile();
    usersController = userModule.get<UsersController>(UsersController);
    usersService = userModule.get<UsersService>(UsersService);
  });
  test('signup', async function () {
    const userSignUpBody: SignUpDto = <SignUpDto>UserHelper.generateCreds();
    await usersController.signUp(userSignUpBody);
    expect(usersService.createMagicLink).toHaveBeenCalled();
  });
  test('signin', async function () {
    const userSignInBody: SignInDto = <SignInDto>UserHelper.generateCreds();
    const signInResponse: TokenDetails = await usersController.signIn(userSignInBody);
    expect(usersService.signIn).toHaveBeenCalled();
    expect(signInResponse).toHaveProperty('accessToken');
    expect(signInResponse['accessToken']).toEqual('accessTokenValue');
  });
  test('create user using token.', async function () {
    const registrationToken: string = UserHelper.generateRandomString();
    const createdUser: User = await usersController.createUser(registrationToken);
    expect(usersService.createUserByRegToken).toHaveBeenCalled();
    expect(createdUser).toHaveProperty('username');
    expect(createdUser).toHaveProperty('email');
    expect(createdUser).toHaveProperty('password');
    expect(createdUser).toHaveProperty('salt');
  });
});