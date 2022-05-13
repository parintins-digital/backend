import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { UserController } from './controllers/user.controller';
import { VisitController } from './controllers/visit.controller';
import { UserService } from './providers/user.service';
import { VisitService } from './providers/visit.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, VisitController],
  providers: [UserService, VisitService],
  exports: [UserService],
})
export class UserModule {}
