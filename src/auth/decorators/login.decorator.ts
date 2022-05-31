import { applyDecorators, UseGuards } from '@nestjs/common';

import { GoogleOAuthGuard } from '../guards/google-auth.guard';

export function GoogleAuth() {
  return applyDecorators(UseGuards(GoogleOAuthGuard));
}
