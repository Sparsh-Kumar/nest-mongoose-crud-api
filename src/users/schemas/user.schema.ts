import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
    min: 5,
    max: 50,
  })
    username: string;

  @Prop({
    unique: true,
    required: true,
    min: 10,
    max: 60,
  })
    email: string;

  @Prop({
    required: true,
    min: 5,
    max: 50,
  })
    password: string;

  @Prop({})
    salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
UserSchema.pre('save', async function (next): Promise<void> {
  const salt: string = await bcrypt.genSalt();
  const encryptedPassword: string = await bcrypt.hash(this.password, salt);
  this.password = encryptedPassword;
  this.salt = salt;
  next();
});
UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  const hashValue: string = await bcrypt.hash(password, <string> this.salt);
  return hashValue === this.password;
};
