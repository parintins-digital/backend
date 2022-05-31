import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { EnvironmentVariables } from 'src/config/env.validation';

type PictureVariables = Pick<
  EnvironmentVariables,
  'PICTURE_UPLOAD' | 'PICTURE_LIMIT'
>;

@Injectable()
export class PictureConfigService implements MulterOptionsFactory {
  constructor(private configService: ConfigService<PictureVariables, true>) {}
  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    const dest = this.pictureUploadDestination;
    const fileSize = this.pictureUploadSizeLimit;

    return {
      dest,
      limits: { fileSize },
    };
  }

  get pictureUploadDestination(): string {
    const dest = this.configService.get('PICTURE_UPLOAD', { infer: true });
    return dest;
  }

  get pictureUploadSizeLimit(): number {
    const fileSize = this.configService.get('PICTURE_LIMIT', { infer: true });
    return fileSize;
  }
}
