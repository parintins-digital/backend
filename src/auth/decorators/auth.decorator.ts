import { applyDecorators, UseGuards } from '@nestjs/common';

import { GoogleAuthGuard } from '../guards/google-auth.guard';

export function OAuth() {
  return applyDecorators(UseGuards(GoogleAuthGuard));
}
