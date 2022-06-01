import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Session,
  Query,
} from '@nestjs/common';

import { VisitService } from '../providers/visit.service';
import { CreateVisitDTO } from '../dto/visit/create-visit.dto';
import { UpdateVisitDTO } from '../dto/visit/update-visit.dto';
import { RequestSession } from 'src/auth/model/request-session';
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
  findHistory(
    @Session() session: RequestSession,
    @Query('visitedOn') date?: Date,
    @Query('title') title?: string,
  ) {
    const userId = session.user;

    let visitedOn;
    if (date != null) {
      visitedOn = {
        gte: new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        ),
        lte: new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        ),
      };
    }

    let picture;
    if (title != null) {
      picture = { title };
    }

    return this.visitService.findMany({ userId, visitedOn, picture });
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
