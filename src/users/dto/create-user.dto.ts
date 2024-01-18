import { IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  name: string;
  @IsEmail()
  email: string;
  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], { message: 'valid role required' })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
