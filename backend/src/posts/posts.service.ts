import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { CreatePostDto } from './dto/create.dto';
import { UpdatePostDto } from './dto/update.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getUserPosts(userId: number): Promise<Post[]> {
    try {
      return await this.postRepository.find({ where: { user_id: userId } });
    } catch (error) {
      throw new ConflictException('Error retrieving posts');
    }
  }

  async getPost(id: number): Promise<Post | null> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async createPost(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    try {
      console.log(createPostDto, userId);
      const post = this.postRepository.create({
        ...createPostDto,
        user_id: userId,
      });
      return await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException('Error creating post');
    }
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, userId: number): Promise<any> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    if (post.user_id !== userId) {
      throw new UnauthorizedException('You can only update your own posts');
    }

    return await this.postRepository.update(id, updatePostDto);
  }

  async deletePost(id: number, userId: number): Promise<any> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    if (post.user_id !== userId) {
      throw new UnauthorizedException('You can only delete your own posts');
    }

    return await this.postRepository.delete(id);
  }
}
