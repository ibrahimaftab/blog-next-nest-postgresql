import { Injectable } from '@nestjs/common';
import { type Post } from 'src/post/entity/post.entity';
import { type DeleteResult } from 'typeorm';
import { type UpdatePostDto, type CreatePostDto } from 'src/post/dto/post.dto';
import { type PostRepository } from 'src/post/repository/post.repository';
import { type CategoryRepository } from 'src/category/repository/category.repository';
import { type Category } from 'src/category/entity/category.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepo.findAll();
  }

  async findOne(slug: string): Promise<Post | null> {
    return this.postRepo.findBySlug(slug);
  }

  async create(postDto: CreatePostDto): Promise<Post> {
    const status = postDto.status ?? false;
    let categories: Category[] = [];

    if (postDto.categories) {
      categories = await this.categoryRepo.findCategoriesByCategoriesId(
        postDto.categories,
      );
    }

    return this.postRepo.createPost({ ...postDto, categories, status });
  }

  async update(postId: string, postDto: UpdatePostDto): Promise<Post> {
    return this.postRepo.updatePost(postId, postDto);
  }

  async remove(postId: string): Promise<DeleteResult> {
    return this.postRepo.deletePost(postId);
  }
}
