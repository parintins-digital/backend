import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ADMIN_STRATEGY } from '../auth.constants';

@Injectable()
export class AdminAuthGuard extends AuthGuard(ADMIN_STRATEGY) {}
