import { Controller, Get, Post, Res, Session } from '@nestjs/common';

import { Response } from 'express';

import { Account } from '../decorators/account.decorator';
import { GoogleAuth } from '../decorators/oauth-auth.decorator';

import { AuthConfigService } from '../providers/auth.config.service';
import { RequestSession } from '../model/request-session';
import { UserAccount } from '../model/user-account';
import { GOOGLE_REDIRECT } from '../auth.constants';
import { LocalAuth } from '../decorators/local-auth.decorator';
import { AdminAuth } from '../decorators/admin-auth.decorator';

@Controller()
export class AuthController {
  constructor(private authConfig: AuthConfigService) {}

  @Get('login')
  @GoogleAuth()
  async oAuthLogin() {}

  @Get(GOOGLE_REDIRECT)
  @GoogleAuth()
  async googleAuthRedirect(
    @Account() userAccount: UserAccount,
    @Session() session: RequestSession,
    @Res() res: Response,
  ) {
    session.user = userAccount.userId;
    session.admin = userAccount.admin;

    return res.redirect(this.authConfig.loginRedirectUrl);
  }

  @Post('login')
  @LocalAuth()
  async localLogin(
    @Account() userAccount: UserAccount,
    @Session() session: RequestSession,
  ) {
    session.user = userAccount.userId;
    session.admin = userAccount.admin;
  }

  @Post('login/admin')
  @AdminAuth()
  async adminLogin(
    @Account() userAccount: UserAccount,
    @Session() session: RequestSession,
  ) {
    session.cookie.maxAge = 10 * 60 * 1000;
    session.user = userAccount.userId;
    session.admin = userAccount.admin;
  }
}
