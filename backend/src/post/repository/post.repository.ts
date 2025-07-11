import { Injectable } from '@nestjs/common';
import { In, type Repository, type DeleteResult } from 'typeorm';
import { Post } from 'src/post/entity/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import type { UpdatePostDto } from 'src/post/dto/post.dto';
import { NewPost } from '../interface/newpost.interface';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  async findAll(): Promise<Post[]> {
    return this.postRepo.find();
  }

  async findBySlug(slug: string): Promise<Post | null> {
    return this.postRepo.findOneBy({ slug });
  }

  async findCategoriesByCategoriesId(
    categoriesId: string[],
  ): Promise<Category[]> {
    return this.categoryRepo.findBy({
      id: In(categoriesId),
    });
  }

  async createPost(newPost: NewPost): Promise<Post> {
    const post = this.postRepo.create(newPost);
    return this.postRepo.save(post);
  }

  async updatePost(id: string, dto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id: Number(id) },
      relations: ['categories'],
    });

    if (!post) throw new Error(`Post with id ${id} not found`);
    else if (post.slug === dto.slug)
      throw new Error(`Post with slug ${dto.slug} already exists!`);

    let categories: Category[] = [];

    // Fetch related categories (assuming IDs are provided in DTO)
    if (dto?.categories) {
      categories = await this.categoryRepo.findBy({
        id: In(dto.categories),
      });
    }

    Object.assign(post, {
      ...dto,
      categories,
    });

    return this.postRepo.save(post);
  }

  async deletePost(id: string): Promise<DeleteResult> {
    return this.postRepo.delete(id);
  }
}
