import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
}
