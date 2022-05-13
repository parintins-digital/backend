import { Controller, Get } from '@nestjs/common';

import { OAuth } from './decorators/auth.decorator';

@Controller('login')
export class AuthController {
  @Get()
  @OAuth()
  async login() {}
}
