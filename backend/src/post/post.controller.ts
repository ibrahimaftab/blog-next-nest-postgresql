import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import type { CreatePostDto, UpdatePostDto } from 'src/post/post.dto';
import { Post as IPost } from 'src/post/post.entity';
import { type DeleteResult } from 'typeorm';
import { SlugifyInterceptor } from 'src/common/interceptors/slugify-interceptor';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.findAll();
  }

  @Get(':slug')
  getPost(@Param('slug') slug: string) {
    return this.postService.findOne(slug);
  }

  @UseInterceptors(SlugifyInterceptor)
  @Post()
  createPost(@Body() post: CreatePostDto): Promise<IPost> {
    return this.postService.create(post);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.update(id, post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): Promise<DeleteResult> {
    return this.postService.remove(id);
  }
}
