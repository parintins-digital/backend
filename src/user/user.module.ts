import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { UserController } from './controllers/user.controller';
import { VisitController } from './controllers/visit.controller';
import { AccountService } from './providers/account.service';
import { UserService } from './providers/user.service';
import { VisitService } from './providers/visit.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, VisitController],
  providers: [UserService, VisitService, AccountService],
  exports: [UserService, AccountService],
})
export class UserModule {}
