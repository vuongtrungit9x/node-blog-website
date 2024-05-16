import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // ...

  @Post()
  create(@Body() createPostDto: Partial<PostEntity>): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: Partial<PostEntity>,
  ): Promise<PostEntity> {
    return this.postsService.update(Number(id), updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(Number(id));
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }
}
