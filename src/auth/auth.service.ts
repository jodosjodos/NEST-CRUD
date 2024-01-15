import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto, SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

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

  // edit
  async editUser(email: string, dto: EditUserDto, user: User) {
    const userInDb = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!userInDb || userInDb.email !== user.email || userInDb.id !== user.id) {
      throw new UnauthorizedException(' Invalid credentials');
    }

    if (dto.password) {
      dto.password = await argon.hash(dto.password);
    }
    const updatedUser = await this.prisma.user.update({
      where: { email: email, id: user.id },
      data: { ...dto },
    });
    return updatedUser;
  }

  async deleteUser(email: string, user: User) {
    if (email !== user.email)
      throw new UnauthorizedException('Invalid credentials');
    const userInDb = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!userInDb) throw new NotFoundException(" user doesn't not exists");
    const deletedUser = await this.prisma.user.delete({
      where: { email: email, id: user.id },
    });
    return deletedUser;
  }

  //  get single user
  async getSingleUser(email: string, user: User) {
    if (email !== user.email)
      throw new UnauthorizedException(' please provide your email');
    const userInDb = await this.prisma.user.findUnique({ where: { email } });
    return userInDb;
  }

  async getAllUsers(hiddenValue: string) {
    const hiddenValueSecret = this.config.get('HIDDEN_API');
    if (hiddenValue !== hiddenValueSecret)
      throw new NotFoundException(" this apis doesn't exists");
    const users = await this.prisma.user.findMany();
    return users;
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
