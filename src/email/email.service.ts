import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignUpDto } from 'src/auth/dto';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendUserWelcome(user: SignUpDto) {
    const confirmation_url = `https://github.com/jodosjodos`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: user.name,
        confirmation_url,
      },
    });
  }

  //  when user deleted his account
  async sendUserGoodBye(user: User) {
    const confirmation_url = `https://localhost:3000/signup`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: ' Thank you to delete account ,',
      template: './goodBye', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: user.name,
        confirmation_url,
      },
    });
  }
}
