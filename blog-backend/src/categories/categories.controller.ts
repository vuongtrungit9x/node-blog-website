import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // ...

  @Post()
  create(@Body() createCategoryDto: Partial<Category>): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<Category>,
  ): Promise<Category> {
    return this.categoriesService.update(Number(id), updateCategoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.categoriesService.delete(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(Number(id));
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
