import { applyDecorators, UseGuards } from '@nestjs/common';

import { AdminAuthGuard } from '../guards/admin-auth.guard';


export function AdminAuth() {
  return applyDecorators(UseGuards(AdminAuthGuard));
}
