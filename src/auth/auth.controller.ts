import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
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

  //  delete user
  @UseGuards(JwtGuard)
  @Delete('deleteUser/:email')
  deleteUser(@Param('email') email: string, @GetUser() user: User) {
    return this.service.deleteUser(email, user);
  }

  // get user
  @UseGuards(JwtGuard)
  @Get('/getSingleUser/:email')
  getSingleUser(@Param('email') email: string, @GetUser() user: User) {
    return this.service.getSingleUser(email, user);
  }

  // get all users
  @Get('/getAllUsers/:hiddenValue')
  getAllUsers(@Param('hiddenValue') hiddenValue: string) {
    return this.service.getAllUsers(hiddenValue);
  }
}
