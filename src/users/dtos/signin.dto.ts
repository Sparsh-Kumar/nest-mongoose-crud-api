import { IsNotEmpty } from 'class-validator';

export default class SignInDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
