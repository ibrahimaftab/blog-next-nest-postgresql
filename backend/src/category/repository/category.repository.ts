import { Injectable } from '@nestjs/common';
import { In, type Repository, type DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import { UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.categoryRepo.findOneBy({ slug });
  }

  async findCategoriesByCategoriesId(
    categoriesId: string[],
  ): Promise<Category[]> {
    return this.categoryRepo.findBy({
      id: In(categoriesId),
    });
  }

  async createCategory(category: Category): Promise<Category> {
    const post = this.categoryRepo.create(category);
    return this.categoryRepo.save(post);
  }

  async updatePost(
    id: string,
    categoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id: Number(id) },
      relations: ['categories'],
    });

    if (!category) throw new Error(`Post with id ${id} not found`);
    else if (category.slug === categoryDto.slug)
      throw new Error(`Post with slug ${categoryDto.slug} already exists!`);

    return this.categoryRepo.save(category);
  }

  async deletePost(id: string): Promise<DeleteResult> {
    return this.categoryRepo.delete(id);
  }
}
