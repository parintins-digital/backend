import { Session } from 'express-session';

export interface RequestSession extends Session {
  user: string;
  admin: boolean;
}
