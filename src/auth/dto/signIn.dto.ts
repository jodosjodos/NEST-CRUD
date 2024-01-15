import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
