import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('posts')
@Controller('posts')
@UseGuards(AuthGuard)
@ApiBearerAuth('bearer')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // ...

  @Post()
  create(@Body() createPostDto: Partial<PostEntity>): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updatePostDto: Partial<PostEntity>,
  ): Promise<PostEntity> {
    return this.postsService.update(Number(id), updatePostDto);
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<void> {
    return this.postsService.remove(Number(id));
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<PostEntity> {
    const post = await this.postsService.findOne(Number(id));
    return post;
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }
}
