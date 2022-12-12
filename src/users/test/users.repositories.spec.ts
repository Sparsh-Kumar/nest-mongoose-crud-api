import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import UsersRepository from '../users.repository';
import UserHelper from './helpers/user-helper';
import SignUpDto from '../dtos/signup.dto';
import { BadRequestException } from '@nestjs/common';

describe('Users Repository [Unit Test]', function () {
  let userModel: Model<UserDocument>;
  let userRepository: UsersRepository;
  beforeEach(async function () {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();
    userModel = userModule.get<Model<UserDocument>>(getModelToken(User.name));
    userRepository = userModule.get<UsersRepository>(UsersRepository);
  });
  test('Mocked User Repo should be defined.', function () {
    expect(userRepository).toBeDefined();
  });
  test('findOne', async function () {
    const user: User = UserHelper.generateUser();
    const spy: jest.SpyInstance = <jest.SpyInstance>(
      jest.spyOn(userModel, 'findOne').mockResolvedValue(user)
    );
    const foundUser: User = await userRepository.findOne({});
    expect(foundUser).toHaveProperty('username');
    expect(foundUser).toHaveProperty('email');
    expect(foundUser).toHaveProperty('password');
    expect(foundUser).toHaveProperty('salt');
    expect(spy).toBeCalled();
  });
  test('findAll', async function () {
    const user: User = UserHelper.generateUser();
    const spy: jest.SpyInstance = <jest.SpyInstance>(
      jest.spyOn(userModel, 'find').mockResolvedValue([user])
    );
    const foundUsers: User[] = await userRepository.findAll({});
    expect(foundUsers).toHaveLength(1);
    expect(foundUsers[0]).toHaveProperty('username');
    expect(foundUsers[0]).toHaveProperty('email');
    expect(foundUsers[0]).toHaveProperty('password');
    expect(foundUsers[0]).toHaveProperty('salt');
    expect(spy).toBeCalled();
  });
  test('findById', async function () {
    const id = UserHelper.generateRandomString();
    const user: User = UserHelper.generateUser();
    const spy: jest.SpyInstance = <jest.SpyInstance>(
      jest.spyOn(userModel, 'findById').mockResolvedValue(user)
    );
    const foundUser: User = await userRepository.findById(id);
    expect(foundUser).toHaveProperty('username');
    expect(foundUser).toHaveProperty('email');
    expect(foundUser).toHaveProperty('password');
    expect(foundUser).toHaveProperty('salt');
    expect(spy).toBeCalled();
  });
  test('createUser - If User already exists.', async function () {
    const user: User = UserHelper.generateUser();
    const findOneSpy: jest.SpyInstance = <jest.SpyInstance>(
      jest.spyOn(userModel, 'findOne').mockResolvedValue(user)
    );
    await expect(
      userRepository.createUser(<SignUpDto>user),
    ).rejects.toThrowError(BadRequestException);
  });
  test('createUser = If User does not exist already.', async function () {
    const user: User = UserHelper.generateUser();
    const findOneSpy: jest.SpyInstance = <jest.SpyInstance>(
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null)
    );
    const createSpy: jest.SpyInstance = <jest.SpyInstance>(
      jest.spyOn(userModel, 'create').mockResolvedValue(user as never)
    ); // Fix for this typecasting ?
    const createdUser: User = await userRepository.createUser(<SignUpDto>user);
    expect(createdUser).toHaveProperty('username');
    expect(createdUser).toHaveProperty('email');
    expect(createdUser).toHaveProperty('password');
    expect(createdUser).toHaveProperty('salt');
    expect(findOneSpy).toBeCalled();
    expect(createSpy).toBeCalled();
  });
});
