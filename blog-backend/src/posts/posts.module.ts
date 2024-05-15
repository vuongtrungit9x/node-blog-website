import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, User, Category])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
