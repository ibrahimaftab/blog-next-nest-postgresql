import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryrRepo: CategoryRepository) {}

  async findAll() {
    return this.categoryrRepo.findAll();
  }

  async findOne(slug: string) {
    if (slug.length === 0) {
      throw new Error('Category Slug cannot be empty');
    }
    const category = await this.categoryrRepo.findBySlug(slug);
    if (!category) {
      throw new Error(`Category with slug ${slug} not found`);
    }
    return category;
  }

  async create(category: CreateCategoryDto) {
    return this.categoryrRepo.createCategory(category);
  }

  async update(id: string, category: UpdateCategoryDto) {
    return this.categoryrRepo.updatePost(id, category);
  }
}
