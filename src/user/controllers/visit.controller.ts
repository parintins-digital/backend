import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Session,
} from '@nestjs/common';

import { VisitService } from '../providers/visit.service';
import { CreateVisitDTO } from '../dto/visit/create-visit.dto';
import { UpdateVisitDTO } from '../dto/visit/update-visit.dto';
import { RequestSession } from 'src/auth/model/user-session';
import { Authenticated } from 'src/auth/decorators/authenticated.decorator';

@Controller('user/visit')
@Authenticated()
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  create(
    @Session() session: RequestSession,
    @Body() { pictureId, visitedOn }: CreateVisitDTO,
  ) {
    const userId = session.user;
    return this.visitService.create({ userId, pictureId }, visitedOn);
  }

  @Get()
  findHistory(@Session() session: RequestSession) {
    const userId = session.user;
    return this.visitService.findMany({ userId });
  }

  @Patch()
  update(
    @Session() session: RequestSession,
    @Body() { pictureId, visitedOn }: UpdateVisitDTO,
  ) {
    const userId = session.user;
    return this.visitService.update({ userId, pictureId }, { visitedOn });
  }

  @Delete()
  remove(
    @Session() session: RequestSession,
    @Body('pictureId') pictureId: string,
  ) {
    const userId = session.user;
    return this.visitService.remove({ userId, pictureId });
  }
}
