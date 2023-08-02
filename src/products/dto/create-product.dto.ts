import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    default: '0203039',
  })
  articul: string;
  @ApiProperty({
    default: 'Аспирин',
  })
  description: string;
  @ApiProperty({
    default: '500',
  })
  cost: number;
  @ApiProperty({
    default: 'Эвалар',
  })
  brand: string;

  @ApiProperty({
    default: 'Файл изображения',
  })
  picture: any;

  @ApiProperty({
    default: '74bfcfbd-9ab9-4e3a-a29e-c7d92d741d2c',
  })
  categoryId?: string;
}

export class getProductsResponse {
  @ApiProperty({ type: () => [CreateProductDto] })
  products: CreateProductDto[];
}
