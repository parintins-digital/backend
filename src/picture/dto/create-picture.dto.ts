import { PictureCategory } from '@prisma/client';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(1500)
  @ValidateIf((_, value) => value !== undefined)
  description: string = '';

  @IsString()
  @IsIn(['ATTRACTION', 'CULTURE', 'LANDMARK', 'COMMUNITY'])
  category: PictureCategory;

  @IsString()
  @IsNotEmpty()
  author: string;

  constructor(
    title: string,
    category: PictureCategory,
    author: string,
    description?: string,
  ) {
    this.title = title;
    this.category = category;
    this.author = author;

    if (description) this.description = description;
  }
}
