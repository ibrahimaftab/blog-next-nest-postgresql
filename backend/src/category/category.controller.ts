import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return this.categoryService.findAll();
  }

  @Get(':slug')
  async getCategory(@Param('slug') slug: string) {
    return this.categoryService.findOne(slug);
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, category);
  }
}
