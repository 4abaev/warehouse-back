import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  getProductsResponse,
} from './dto/create-product.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Продукты')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создание продукта' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 200, type: CreateProductDto })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  @Post()
  create(@UploadedFiles() files, @Body() CreateProductDto: CreateProductDto) {
    const { picture } = files;
    return this.productsService.create(CreateProductDto, picture[0]);
  }

  @ApiOperation({ summary: 'Получить все продукты' })
  @ApiResponse({ status: 200, type: getProductsResponse })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Получить продукт по id' })
  @ApiResponse({ status: 200, type: CreateProductDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Удалить продукт' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
