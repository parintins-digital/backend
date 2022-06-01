import { applyDecorators, UseGuards } from '@nestjs/common';

import { SessionGuard } from '../guards/session.guard';
import { AdminGuard } from '../guards/admin.guard';

export function Admin() {
  return applyDecorators(UseGuards(SessionGuard, AdminGuard));
}
