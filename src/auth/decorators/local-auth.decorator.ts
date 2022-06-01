import { applyDecorators, UseGuards } from '@nestjs/common';

import { GoogleOAuthGuard } from '../guards/google-auth.guard';

export function LocalAuth() {
  return applyDecorators(UseGuards(GoogleOAuthGuard));
}
