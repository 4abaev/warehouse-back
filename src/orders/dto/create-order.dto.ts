import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class getOrdersResponse {
  orders: CreateOrderDto[];
}

export enum Flag {
  warehouseOrder = 'warehouseOrder',
  Order = 'Order',
  Sale = 'Sale',
}

enum Status {
  Created = 'Created',
  Done = 'Done',
}

export class CreateOrderDto {
  @ApiProperty({
    default: 'Заказ для бабушки',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({
    default: 'warehouseOrder',
  })
  @IsNotEmpty()
  flag: Flag;

  @ApiProperty({
    default: 'Created',
  })
  @IsNotEmpty()
  status: Status;

  @ApiProperty({
    default: 100000,
  })
  @IsNotEmpty()
  totalCost: number;

  @ApiProperty({ type: () => [CreateOrderProductItemDto] })
  @ValidateNested({ each: true })
  @IsNotEmpty()
  products: CreateOrderProductItemDto[];
}

export class CreateOrderProductItemDto {
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

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    default: '100',
  })
  cost: number;
}
