import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../posts/post.entity';
import { User } from '../users/user.entity';
import { Comment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, User, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, PostsService],
})
export class CommentsModule {}
