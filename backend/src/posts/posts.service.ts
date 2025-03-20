import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

  async getAllPosts(): Promise<Post[]> {
    try {
      return await this.postRepository.find();
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

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const post = this.postRepository.create(createPostDto);
      return await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException('Error creating post');
    }
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<any> {
    return await this.postRepository.update(id, updatePostDto);

  }
}
