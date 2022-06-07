import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LocalAccount, OAuthAccount } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { Profile } from 'passport';

import { AccountService } from 'src/user/providers/account.service';
import { UserService } from 'src/user/providers/user.service';
import { JwtPayload } from '../model/jwt-payload';
import { AuthConfigService } from './auth.config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: AuthConfigService,
    private readonly userService: UserService,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async oauthLogin(profile: Profile): Promise<OAuthAccount> {
    let account = await this.accountService.findOAuthAccount({
      subject: profile.id,
    });

    if (account == null) {
      const firstName = profile.name?.givenName ?? profile.displayName;
      const lastName = profile.name?.familyName;

      const { id } = await this.userService.create({ firstName, lastName });
      account = await this.accountService.createOAuthAccount(
        {
          provider: profile.provider,
          subject: profile.id,
        },
        { id },
      );
    }

    return account;
  }

  async localLogin(email: string, password: string): Promise<LocalAccount> {
    const account = await this.accountService.findLocalAccount({
      email,
      admin: false,
    });

    // Email não registrado
    if (account == null) {
      throw new UnauthorizedException();
    }

    const match = await compare(password, account.password.toString());

    if (!match) {
      throw new UnauthorizedException();
    }

    return account;
  }

  async adminLogin(email: string, password: string): Promise<LocalAccount> {
    const account = await this.accountService.findLocalAccount({
      email,
      admin: true,
    });

    // Email não registrado
    if (account == null) {
      throw new UnauthorizedException();
    }

    const match = await compare(password, account.password.toString());

    if (!match) {
      throw new UnauthorizedException();
    }

    return account;
  }

  async emailPasswordResetUrl(email: string): Promise<void> {
    const account = await this.accountService.findLocalAccount({
      email,
    });

    if (account == null) {
      return;
    }

    const user = (await this.userService.findOne({ id: account.userId }))!;

    const payload: JwtPayload = {
      email,
      id: user.id,
    };
    const token = await this.jwtService.signAsync(payload);

    const resetUrl = `${this.configService.clientUrl}/reset/new-password?token=${token}`;

    await this.mailerService.sendMail({
      template: 'reset-password',
      to: email,
      subject: 'Alteração de senha',
      context: {
        name: user.firstName,
        url: resetUrl,
      },
    });
  }

  async resetPassword(token: string, password: string) {
    const payload: JwtPayload = await this.jwtService.verifyAsync(token);

    const hashedPassword = Buffer.from(await hash(password, 10), 'utf-8');

    await this.accountService.updatePassword(
      { email: payload.email },
      hashedPassword,
    );

    return;
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
      return;
    } catch {
      throw new NotFoundException();
    }
  }
}
