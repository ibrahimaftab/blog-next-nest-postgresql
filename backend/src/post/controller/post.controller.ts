import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostService } from 'src/post/service/post.service';
import type { CreatePostDto, UpdatePostDto } from 'src/post/dto/post.dto';
import { Post as IPost } from 'src/post/entity/post.entity';
import { type DeleteResult } from 'typeorm';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('all')
  getPosts() {
    return this.postService.findAll();
  }

  @Get(':slug')
  getPost(@Param('slug') slug: string) {
    return this.postService.findOne(slug);
  }

  @Post('create')
  createPost(@Body() post: CreatePostDto): Promise<IPost> {
    return this.postService.create(post);
  }

  @Put('update/:id')
  updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.update(id, post);
  }

  @Delete('delete/:id')
  deletePost(@Param('id') id: string): Promise<DeleteResult> {
    return this.postService.remove(id);
  }
}
