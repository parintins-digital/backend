import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import type { AuthConfigService } from '../auth.config.service';
import type { JwtPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authConfig: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.name };
  }
}
