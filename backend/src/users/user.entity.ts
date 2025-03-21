import { Post } from 'src/posts/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  provider: string;

  @Column({ type: 'text' , default: null})
  image: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
