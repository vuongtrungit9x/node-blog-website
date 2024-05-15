import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  create(comment: Partial<Comment>): Promise<Comment> {
    return this.commentsRepository.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  findOne(id: number): Promise<Comment> {
    return this.commentsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.commentsRepository.delete(id);
  }

  async update(
    id: number,
    updateCommentDto: Partial<Comment>,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.findOneBy({ id });
    if (!comment) {
      throw new Error('Comment not found');
    }
    Object.assign(comment, updateCommentDto);
    return this.commentsRepository.save(comment);
  }
}
