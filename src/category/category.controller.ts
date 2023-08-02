import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  getCategoriesResponse,
} from './dto/create-category.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Категории')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создание категории' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 200, type: CreateCategoryDto })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Получить все категории' })
  @ApiResponse({ status: 200, type: getCategoriesResponse })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Получить категорию' })
  @ApiResponse({ status: 200, type: CreateCategoryDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: 'Удалить категорию' })
  @ApiResponse({ status: 200, type: CreateCategoryDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
