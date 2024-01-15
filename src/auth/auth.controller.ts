import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EditUserDto, SignInDto, SignUpDto } from './dto';
import { JwtGuard } from './guard';
import { GetUser } from './decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/signup')
  signUp(@Body() dto: SignUpDto) {
    return this.service.signUp(dto);
  }
  @Post('/signIn')
  signIn(@Body() dto: SignInDto) {
    return this.service.signIn(dto);
  }
  @Patch('editUser/:email')
  @UseGuards(JwtGuard)
  updateUser(
    @Param('email') email: string,
    @Body() dto: EditUserDto,
    @Req() req: Request,
    @GetUser() user: User,
  ) {
    return this.service.editUser(email, dto, user);
  }
}
