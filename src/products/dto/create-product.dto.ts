import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: '0203039',
  })
  articul: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Аспирин',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Эвалар',
  })
  brand: string;

  @ApiProperty({
    default: 'Файл изображения',
  })
  picture: any;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Лекарства',
  })
  category: string;
}

export class getProductsResponse {
  @ApiProperty({ type: () => [CreateProductDto] })
  products: CreateProductDto[];
}
