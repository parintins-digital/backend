import { Controller, Get, Res, Session } from '@nestjs/common';
import { User as RequestUser } from '@prisma/client';

import { Response } from 'express';

import { User } from '../decorators/user.decorator';
import { GoogleAuth } from '../decorators/login.decorator';

import { AuthConfigService } from '../providers/auth.config.service';
import { GOOGLE_REDIRECT } from '../auth.constants';
import { RequestSession } from '../model/user-session';

@Controller()
export class AuthController {
  constructor(private authConfig: AuthConfigService) {}

  @Get('login')
  @GoogleAuth()
  async login() {}

  @Get(GOOGLE_REDIRECT)
  @GoogleAuth()
  async redirect(
    @User() user: RequestUser,
    @Session() session: RequestSession,
    @Res() res: Response,
  ) {
    session.user = user.id;
    session.admin = user.admin;
    res.redirect(this.authConfig.loginRedirectUrl);
  }
}
