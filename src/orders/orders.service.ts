import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { comment, totalCost, products } = createOrderDto;

    const order = await this.prismaService.order.create({
      data: {
        comment,
        totalCost,
        products: {
          create: products.map((product) => ({
            quantity: product.quantity,
            product: {
              connect: { id: product.productId },
            },
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return order;
  }

  async findAll() {
    return await this.prismaService.order.findMany({
      include: { products: true },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.order.findUnique({
      where: { id: id },
      include: { products: true },
    });
  }

  async remove(id: string) {
    return await this.prismaService.order.delete({ where: { id: id } });
  }
}
