import { Module } from '@nestjs/common';
import { PostTagsController } from './post-tags.controller';

@Module({
  controllers: [PostTagsController]
})
export class PostTagsModule {}
