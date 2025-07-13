import { Injectable } from '@nestjs/common';

import { type DeleteResult } from 'typeorm';

import { type Post } from 'src/post/post.entity';
import { type UpdatePostDto, type CreatePostDto } from 'src/post/post.dto';

import { PostRepository } from 'src/post/post.repository';
import { PostCategoryEnhancer } from 'src/post/enhancer/post-category.enhance';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly postCategoryEnhancer: PostCategoryEnhancer,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepo.findAll();
  }

  async findOne(slug: string): Promise<Post | null> {
    return this.postRepo.findBySlug(slug);
  }

  async create(postDto: CreatePostDto): Promise<Post> {
    const status = postDto.status ?? false;
    const categories = await this.postCategoryEnhancer.enhance(postDto);
    return this.postRepo.createPost({ ...postDto, categories, status });
  }

  async update(postId: string, postDto: UpdatePostDto): Promise<Post> {
    return this.postRepo.updatePost(postId, postDto);
  }

  async remove(postId: string): Promise<DeleteResult> {
    return this.postRepo.deletePost(postId);
  }
}
