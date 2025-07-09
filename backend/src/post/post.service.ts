import { Injectable } from '@nestjs/common';
import { Post } from 'src/post/post.entity';
import { In, type Repository, type UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './post.dto';
import { Category } from 'src/category/category.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(slug: string): Promise<Post | null> {
    return this.postRepository.findOneBy({ slug });
  }

  async create(postDto: CreatePostDto): Promise<Post> {
    let categories: Category[] = [];

    // Fetch related categories (assuming IDs are provided in DTO)
    if (postDto.categories) {
      categories = await this.categoryRepository.findBy({
        id: In(postDto.categories),
      });
    }

    // Construct Post entity manually
    const post = this.postRepository.create({
      title: postDto.title,
      description: postDto.description,
      summary: postDto.summary,
      image: postDto.image,
      slug: postDto.slug,
      status: true,
      categories,
    });

    return this.postRepository.save(post);
  }

  async update(postId: string, post: Post): Promise<UpdateResult> {
    return this.postRepository.update(postId, post);
  }

  async remove(postId: string): Promise<void> {
    await this.postRepository.delete(postId);
  }
}
