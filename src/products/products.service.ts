import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma.service';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private fileService: FileService,
  ) {}

  async create(createProductDto: CreateProductDto, picture) {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    return await this.prismaService.product.create({
      data: {
        ...createProductDto,
        picture: picturePath,
      },
    });
  }

  async findAll() {
    return await this.prismaService.product.findMany({});
  }

  async findOne(id: string) {
    return await this.prismaService.product.findUnique({
      where: { id: id },
    });
  }

  async remove(id: string) {
    return await this.prismaService.product.delete({ where: { id: id } });
  }
}
