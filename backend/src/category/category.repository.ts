import { Injectable } from '@nestjs/common';
import { In, type Repository, type DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { UpdateCategoryDto, CreateCategoryDto } from './category.dto';

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

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async updatePost(
    id: string,
    categoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id: Number(id) },
      relations: ['categories'],
    });

    if (!category) throw new Error(`Category with id ${id} not found`);
    else if (category.slug === categoryDto.slug)
      throw new Error(`Category with slug ${categoryDto.slug} already exists!`);

    return this.categoryRepo.save(category);
  }

  async deletePost(id: string): Promise<DeleteResult> {
    return this.categoryRepo.delete(id);
  }
}
