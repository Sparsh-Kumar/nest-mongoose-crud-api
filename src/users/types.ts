import { UserDocument } from './schemas/user.schema';

export type DecodedJWTPayload = {
  id: string;
};

export interface LooseObject {
  [key: string]: any
}

export type TokenDetails = {
  accessToken: string;
};

export type UserSchemaMethods = {
  validatePassword(password: string): Promise<boolean>,
};

export type UserDocWithSchemaMethods = UserDocument & UserSchemaMethods;
