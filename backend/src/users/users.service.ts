import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<User | null> {
    return await this.userRepository.findOne({  where: { id },});
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({  where: { email },});
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | null>{
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user); 
  }
}
