import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Session,
} from '@nestjs/common';

import { Response } from 'express';

import { Account } from '../decorators/account.decorator';
import { GoogleAuth } from '../decorators/oauth-auth.decorator';

import { AuthConfigService } from '../providers/auth.config.service';
import { RequestSession } from '../model/request-session';
import { UserAccount } from '../model/user-account';
import { GOOGLE_REDIRECT } from '../auth.constants';
import { LocalAuth } from '../decorators/local-auth.decorator';
import { AdminAuth } from '../decorators/admin-auth.decorator';
import { ForgotPasswordDTO } from '../dto/forgot-password.dto';
import { AuthService } from '../providers/auth.service';
import { ResetPasswordDTO } from '../dto/reset-password.dto';
import { isEmail } from 'class-validator';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private authConfig: AuthConfigService,
  ) {}

  @Get('login')
  @GoogleAuth()
  oAuthLogin() {}

  @Get(GOOGLE_REDIRECT)
  @GoogleAuth()
  googleAuthRedirect(
    @Account() userAccount: UserAccount,
    @Session() session: RequestSession,
    @Res() res: Response,
  ) {
    session.user = userAccount.userId;
    session.admin = userAccount.admin;
    session.save((err) => (err != null ? console.log(err) : err));

    return res.redirect(this.authConfig.loginRedirectUrl);
  }

  @Post('login')
  @LocalAuth()
  localLogin(
    @Account() userAccount: UserAccount,
    @Session() session: RequestSession,
  ) {
    session.user = userAccount.userId;
    session.admin = userAccount.admin;
  }

  @Post('login/admin')
  @AdminAuth()
  adminLogin(
    @Account() userAccount: UserAccount,
    @Session() session: RequestSession,
  ) {
    session.user = userAccount.userId;
    session.admin = userAccount.admin;
  }

  @Delete('logout')
  logout(@Session() session: RequestSession) {
    session.destroy((err) => (err != null ? console.log(err) : err));
  }

  @Put('forgot-password')
  forgotPassword(@Body() { email }: ForgotPasswordDTO): void | Promise<void> {
    if (isEmail(email)) {
      return this.authService.emailPasswordResetUrl(email);
    }
  }

  @Put('reset-password/:token')
  resetPassword(
    @Param('token') token: string,
    @Body() { password }: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(token, password);
  }

  @Get('reset-password/:token')
  validateResetToken(@Param('token') token: string) {
    return this.authService.verifyToken(token);
  }
}
