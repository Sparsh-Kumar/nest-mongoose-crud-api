import { User } from "src/users/schemas/user.schema";
import { Creds } from "./types";
import * as passwordGenerator from 'generate-password';

export default class UserHelper {
  public static generateRandomString(): string {
    return '';
  }
  public static generateUsername(): string {
    return this.generateRandomString();
  }
  public static generateEmail(): string {
    return `${this.generateRandomString()}@sample.com`;
  }
  public static generatePassword(length: number = 10): string {
    return passwordGenerator.generate({
      length,
      numbers: true,
      lowercase: true,
      uppercase: true,
    });
  }
  public static generateCreds(): Creds {
    return {
      username: this.generateUsername(),
      email: this.generateEmail(),
      password: this.generatePassword(),
    }
  }
  public static generateUser(): User {
    return {
      username: this.generateUsername(),
      email: this.generateEmail(),
      password: this.generatePassword(),
      salt: this.generateRandomString(),
    }
  }
}
