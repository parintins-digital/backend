import { PictureCategory } from '@prisma/client';
import { IsIn, IsNotEmpty, IsString, MaxLength, NotEquals } from 'class-validator';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @NotEquals(null)
  @MaxLength(1500)
  description?: string = '';

  @IsString()
  @IsIn(['ATTRACTION', 'CULTURE', 'LANDMARK', 'COMMUNITY'])
  category: PictureCategory;

  constructor(title: string, category: PictureCategory, description?: string) {
    this.title = title;
    this.category = category;

    if (description) this.description = description;
  }
}
