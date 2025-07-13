import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from 'src/post/post.controller';
import { PostService } from 'src/post/post.service';
import { Post } from 'src/post/post.entity';
import { PostRepository } from 'src/post/post.repository';
import { Category } from 'src/category/category.entity';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryModule } from 'src/category/category.module';
import { PostCategoryEnhancer } from 'src/post/enhancer/post-category.enhance';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category]), CategoryModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostCategoryEnhancer],
})
export class PostModule {}
