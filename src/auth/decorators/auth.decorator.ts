import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOAuth2 } from '@nestjs/swagger';

import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { GOOGLE_SCOPES } from '../auth.constants';

export function OAuth() {
  return applyDecorators(UseGuards(GoogleAuthGuard), ApiOAuth2(GOOGLE_SCOPES));
}
