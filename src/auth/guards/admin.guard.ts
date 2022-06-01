import { ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { RequestSession } from '../model/request-session';
import { SessionGuard } from './session.guard';

@Injectable()
export class AdminGuard extends SessionGuard {
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const session: RequestSession = context.switchToHttp().getRequest().session;
    return super.canActivate(context) && session.admin === true;
  }
}
