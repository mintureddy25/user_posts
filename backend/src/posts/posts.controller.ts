// post.controller.ts
import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create.dto';
import { UpdatePostDto } from './dto/update.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Get all posts
  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  // Get a specific post by id
  @Get(':id')
  async getPost(@Param('id') id: number) {
    return this.postService.getPost(id);
  }

  // Create a new post
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  // Update an existing post by id
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, updatePostDto);
  }
}
