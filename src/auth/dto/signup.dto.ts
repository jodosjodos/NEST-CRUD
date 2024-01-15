import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @MinLength(10, {
    message: 'Phone number must be at least 10 characters long',
  })
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  phoneNumber: string;
}
