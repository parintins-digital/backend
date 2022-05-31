import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { PictureService } from './providers/picture.service';
import { PictureController } from './controllers/picture.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PictureConfigService } from './providers/picture.config.service';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.registerAsync({ useClass: PictureConfigService }),
  ],
  controllers: [PictureController],
  providers: [PictureService, PictureConfigService],
})
export class PictureModule {}
