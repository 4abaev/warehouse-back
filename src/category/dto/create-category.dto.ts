import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  id: string;

  @ApiProperty({
    default: 'Лекарства',
  })
  @IsString()
  @Length(4, 48, {
    message: 'Название категории может содержать от 4 до 48 символов',
  })
  name: string;
}

export class CreateCategoryResponse {
  @ApiProperty({
    default: 'Уникальный идентификатор',
  })
  id: string;

  @ApiProperty({
    default: 'Лекарства',
  })
  @IsString()
  @Length(4, 48, {
    message: 'Название категории может содержать от 4 до 48 символов',
  })
  name: string;
}

export class getCategoriesResponse {
  @ApiProperty({ type: () => [CreateCategoryDto] })
  categories: CreateCategoryDto[];
}
