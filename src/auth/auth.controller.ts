import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GOOGLE_REDIRECT } from './auth.constants';

import { OAuth } from './decorators/auth.decorator';

@Controller('')
@ApiTags('Auth')
export class AuthController {
  @Get('login')
  @OAuth()
  async login() {}

  @Get(GOOGLE_REDIRECT)
  @Redirect('/', 200)
  async redirect() {}
}
