import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
import { Comment } from './comment.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  // ...

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    const { userId, postId, content } = createCommentDto;
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new HttpException(
        'Bad Request, user not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    // TODO: add try catch & check not found
    const post = await this.postsService.findOne(postId);
    if (!post) {
      throw new HttpException(
        'Bad Request, post not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    // TODO: add try catch & check not found
    const newComment = new Comment();
    newComment.user = user;
    newComment.post = post;
    newComment.content = content;

    return this.commentsService.create(newComment);
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
