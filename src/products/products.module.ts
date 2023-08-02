import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, FileService],
})
export class ProductsModule {}
