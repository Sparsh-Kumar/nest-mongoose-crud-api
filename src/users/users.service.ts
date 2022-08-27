import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { LooseObject } from './types';
import UsersRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(
    private _userRepository: UsersRepository,
  ) {}

  public async findOne(filters: LooseObject): Promise<UserDocument> {
    return this._userRepository.findOne(filters);
  }

  public async findAll(filters: LooseObject): Promise<UserDocument[]> {
    return this._userRepository.findAll(filters);
  }

  public async findById(id: string): Promise<UserDocument> {
    return this._userRepository.findById(id);
  }
}
