import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';

import { User } from 'src/auth/decorators/user.decorator';
import { VisitService } from '../providers/visit.service';
import { CreateVisitDTO } from '../dto/visit/create-visit.dto';
import { UpdateVisitDTO } from '../dto/visit/update-visit.dto';

@Controller('user/visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  create(
    @User('id') userId: string,
    @Body() { pictureId, visitedOn }: CreateVisitDTO,
  ) {
    return this.visitService.create({ userId, pictureId }, visitedOn);
  }

  @Get()
  findHistory(@User('id') userId: string) {
    return this.visitService.findMany({ userId });
  }

  @Patch()
  update(@User('id') userId: string, @Body() {pictureId, visitedOn}: UpdateVisitDTO) {
    return this.visitService.update({ userId, pictureId }, {visitedOn});
  }

  @Delete()
  remove(@User('id') userId: string, @Body('pictureId') pictureId: string) {
    return this.visitService.remove({ userId, pictureId });
  }
}
