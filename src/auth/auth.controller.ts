import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/signup')
  signUp(@Body() dto: SignUpDto) {
    return this.service.signUp(dto);
  }
}
