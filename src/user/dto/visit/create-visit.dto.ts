import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class CreateVisitDTO {
  @IsUUID()
  pictureId: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  visitedOn?;

  constructor(pictureId: string, visitedOn?: Date) {
    this.pictureId = pictureId;
    this.visitedOn = visitedOn;
  }
}
