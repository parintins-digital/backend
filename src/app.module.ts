import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { PictureModule } from './picture/picture.module';

@Module({
  imports: [UserModule, PictureModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
