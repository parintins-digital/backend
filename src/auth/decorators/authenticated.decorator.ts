import { applyDecorators, UseGuards } from '@nestjs/common';

import { SessionGuard } from '../guards/session.guard';

export function Authenticated() {
  return applyDecorators(UseGuards(SessionGuard));
}
