import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { products } = createOrderDto;

    const order = await this.prismaService.order.create({
      data: {
        ...createOrderDto,
        products: JSON.stringify(products),
      },
    });

    return order;
  }

  async findAll() {
    const orders = await this.prismaService.order.findMany({});

    const ordersWithArrayProducts = orders.map((order) => ({
      ...order,
    }));

    return ordersWithArrayProducts;
  }

  async findOne(id: string) {
    return await this.prismaService.order.findUnique({
      where: { id: id },
    });
  }

  async remove(id: string) {
    return await this.prismaService.order.delete({ where: { id: id } });
  }
}
