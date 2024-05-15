import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: Partial<Category>): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async update(
    id: number,
    updateCategoryDto: Partial<Category>,
  ): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new Error('Category not found');
    }
    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }

  findOne(id: number): Promise<Category> {
    return this.categoriesRepository.findOneBy({ id });
  }
  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }
}
