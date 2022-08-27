import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { LooseObject } from './types';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
  ) {}

  public async findOne(filters: LooseObject): Promise<UserDocument> {
    return this._userModel.findOne(filters);
  }

  public async findAll(filters: LooseObject): Promise<UserDocument[]> {
    return this._userModel.find(filters);
  }

  public async findById(id: string): Promise<UserDocument> {
    return this._userModel.findById(id);
  }
}
