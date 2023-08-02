import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.prismaService.category.findMany({
      include: { products: true },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.category.findUnique({ where: { id } });
  }

  async remove(id: string) {
    return await this.prismaService.category.findUnique({ where: { id } });
  }
}
