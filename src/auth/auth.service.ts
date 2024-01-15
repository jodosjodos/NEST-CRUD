import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: SignUpDto) {
    try {
      const hashedPassword = await argon.hash(dto.password);
      const savedUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          phoneNumber: dto.phoneNumber,
        },
      });
      console.log(savedUser);

      return savedUser;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException('user with that email  already exists');
        }
      }

      return { msg: e };
    }
  }
  async signIn(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');
    const isPwMatch = await argon.verify(user.password, dto.password);
    if (!isPwMatch) throw new ForbiddenException('Invalid credentials');
    const token = await this.generateToken(user.email, user.id);
    return { user, token };
  }

  async generateToken(email: string, id: number): Promise<string> {
    const payLoad = { email, sub: id };
    const token = await this.jwtService.signAsync(payLoad, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '1d',
    });
    return token;
  }
}
