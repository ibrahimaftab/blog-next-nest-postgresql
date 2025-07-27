import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  IsUUID,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsString()
  @Length(3, 100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase, alphanumeric, and may include hyphens',
  })
  slug: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase, alphanumeric, and may include hyphens',
  })
  slug?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // validate each item in array
  categories?: string[];

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
