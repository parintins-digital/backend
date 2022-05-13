import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { PictureService } from './providers/picture.service';
import { PictureController } from './controllers/picture.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
