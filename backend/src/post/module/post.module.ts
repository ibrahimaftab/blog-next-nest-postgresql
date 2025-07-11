import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from 'src/post/controller/post.controller';
import { PostService } from 'src/post/service/post.service';
import { Post } from 'src/post/entity/post.entity';
import { Category } from 'src/category/entity/category.entity';
import { PostRepository } from 'src/post/repository/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
