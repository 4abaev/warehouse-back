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

export enum Status {
  warehouseOrder = 'warehouseOrder',
  Order = 'Order',
  Sale = 'Sale',
}

export class CreateOrderDto {
  @ApiProperty({
    default: 'Заказ для бабушки',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({
    default: 100000,
  })
  @IsNotEmpty()
  status: Status;

  @ApiProperty({ type: () => [CreateOrderProductItemDto] })
  @ValidateNested({ each: true })
  @IsNotEmpty()
  products: CreateOrderProductItemDto[];
}

export class CreateOrderProductItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
