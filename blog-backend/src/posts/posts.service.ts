import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  create(post: Partial<PostEntity>): Promise<PostEntity> {
    return this.postsRepository.save(post);
  }

  findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  findOne(id: number): Promise<PostEntity> {
    return this.postsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }

  async update(
    id: number,
    updatePostDto: Partial<PostEntity>,
  ): Promise<PostEntity> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new Error('Post not found');
    }
    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }
}
