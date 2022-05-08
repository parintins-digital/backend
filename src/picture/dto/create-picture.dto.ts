import type { PictureCategory } from '@prisma/client';
import { IsIn, IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @NotEquals(null)
  description?: string;

  @IsString()
  @IsIn(['ATTRACTION', 'CULTURE', 'LANDMARK', 'COMMUNITY'])
  category: PictureCategory;

  constructor(title: string, category: PictureCategory, description?: string) {
    this.title = title;
    this.category = category;

    if (description) this.description = description;
  }
}
