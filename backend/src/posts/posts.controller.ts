import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create.dto';
import { UpdatePostDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.gaurd';


@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPosts(@Request() req) {
    const userId = req.user.id;
    return this.postService.getUserPosts(userId);
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return this.postService.getPost(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    const userId = req.user.id;
    console.log(req.user);
    return this.postService.createPost(createPostDto, userId);
  }

  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.postService.updatePost(id, updatePostDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    return this.postService.deletePost(id, userId);
  }
}
