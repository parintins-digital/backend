import { PickType } from "@nestjs/mapped-types"
import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { CreateVisitDTO } from "./create-visit.dto"


export class UpdateVisitDTO extends PickType(CreateVisitDTO, ['pictureId']) {
  @IsDate()
  @Type(() => Date)
  visitedOn: Date;

  constructor(pictureId: string, visitedOn: Date) {
      super();
      this.pictureId = pictureId;
      this.visitedOn = visitedOn;
  }
}