import { CategoryRepository } from 'src/category/category.repository';
import { CreatePostDto } from 'src/post/post.dto';
import { Category } from 'src/category/category.entity';
import { PostEnhancer } from 'src/post/enhancer/post.enhancer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostCategoryEnhancer
  implements PostEnhancer<CreatePostDto, Promise<Partial<Category[]>>>
{
  constructor(private readonly categoryRepo: CategoryRepository) {}
  async enhance(dto: CreatePostDto) {
    if (!dto.categories?.length) return [];
    console.log(this.categoryRepo);
    return this.categoryRepo.findCategoriesByCategoriesId(dto.categories);
  }
}
