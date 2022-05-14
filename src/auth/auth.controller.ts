import { Controller, Get, Redirect } from '@nestjs/common';

import { GOOGLE_REDIRECT } from './auth.constants';
import { GoogleAuth } from './decorators/auth.decorator';

@Controller()
export class AuthController {
  @Get('login')
  @GoogleAuth()
  async login() {
    console.log('login');
  }

  @Get(GOOGLE_REDIRECT)
  @GoogleAuth()
  @Redirect('https://parintinsdigital.com.br')
  async redirect() {}
}
