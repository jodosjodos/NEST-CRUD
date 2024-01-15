import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

interface payloadProps {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: payloadProps) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub, email: payload.email },
    });
    if (!user)
      throw new UnauthorizedException(
        "please valid token with valid credentials or user doesn't exists",
      );
    return user;
  }
}
