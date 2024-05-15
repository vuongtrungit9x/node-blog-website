import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // ...

  @Post()
  create(@Body() createCommentDto: Partial<Comment>): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: Partial<Comment>,
  ): Promise<Comment> {
    return this.commentsService.update(Number(id), updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(Number(id));
  }

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }
}
