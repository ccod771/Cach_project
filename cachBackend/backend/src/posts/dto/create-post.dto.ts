import {
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  description?: string;
}