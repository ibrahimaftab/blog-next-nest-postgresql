import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';
import { Post as IPost } from './post.entity';

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
}
