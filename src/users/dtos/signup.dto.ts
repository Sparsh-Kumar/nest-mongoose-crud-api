import {
  IsNotEmpty, Matches, MaxLength, MinLength,
} from 'class-validator';

export default class SignUpDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
    username: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(60)
  @Matches(
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    {
      message: 'Invalid email !, Please enter a valid email.',
    },
  )
    email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @Matches(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    {
      message: 'Invalid password !, must contain an uppercase letter, a lowercase letter, a number and a special character',
    },
  )
    password: string;
}
