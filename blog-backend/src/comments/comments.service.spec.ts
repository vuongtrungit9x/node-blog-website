import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let commentsRepository: Repository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    commentsRepository = module.get<Repository<Comment>>(
      getRepositoryToken(Comment),
    );
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const comment: Partial<Comment> = {
        content: 'Sample comment',
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          id: 1,
          username: 'sampleuser',
          email: 'sampleuser@example.com',
          password_hash: 'samplehash',
        },
        post: {
          id: 1,
          title: 'Sample post',
          content: 'Sample post content',
          created_at: new Date(),
          updated_at: new Date(),
          user: {
            id: 1,
            username: 'sampleuser',
            email: 'sampleuser@example.com',
            password_hash: 'samplehash',
          },
          category: {
            id: 1,
            name: 'Sample category',
          },
        },
      };

      const createdComment: Comment = {
        id: 1,
        content: comment.content,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        user: comment.user,
        post: comment.post,
      };

      jest.spyOn(commentsRepository, 'save').mockResolvedValue(createdComment);

      const result = await commentsService.create(comment);

      expect(result).toEqual(createdComment);
      expect(commentsRepository.save).toHaveBeenCalledWith(comment);
    });
  });

  describe('findAll', () => {
    it('should return an array of comments', async () => {
      const comments: Comment[] = [
        // Provide some example comments
      ];

      jest.spyOn(commentsRepository, 'find').mockResolvedValue(comments);

      const result = await commentsService.findAll();

      expect(result).toEqual(comments);
      expect(commentsRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a comment by id', async () => {
      const commentId = 1;
      const comment: Comment = {
        id: 1,
        content: 'Sample comment',
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          id: 1,
          username: 'sampleuser',
          email: 'sampleuser@example.com',
          password_hash: 'samplehash',
        },
        post: {
          id: 1,
          title: 'Sample post',
          content: 'Sample post content',
          created_at: new Date(),
          updated_at: new Date(),
          user: {
            id: 1,
            username: 'sampleuser',
            email: 'sampleuser@example.com',
            password_hash: 'samplehash',
          },
          category: {
            id: 1,
            name: 'Sample category',
          },
        },
      };

      jest.spyOn(commentsRepository, 'findOne').mockResolvedValue(comment);

      const result = await commentsService.findOne(commentId);

      expect(result).toEqual(comment);
      expect(commentsRepository.findOne).toHaveBeenCalledWith({
        relations: ['user', 'post'],
        where: { id: commentId },
      });
    });
  });

  describe('remove', () => {
    it('should remove a comment by id', async () => {
      const commentId = 1;

      jest.spyOn(commentsRepository, 'delete').mockResolvedValue(undefined);

      await commentsService.remove(commentId);

      expect(commentsRepository.delete).toHaveBeenCalledWith(commentId);
    });
  });

  describe('update', () => {
    it('should update a comment by id', async () => {
      const commentId = 1;
      const updateCommentDto: Partial<Comment> = {
        id: 1,
        content: 'Updated comment',
      };
      const foundComment: Comment = {
        id: 1,
        content: 'Sample comment',
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          id: 1,
          username: 'sampleuser',
          email: 'sampleuser@example.com',
          password_hash: 'samplehash',
        },
        post: {
          id: 1,
          title: 'Sample post',
          content: 'Sample post content',
          created_at: new Date(),
          updated_at: new Date(),
          user: {
            id: 1,
            username: 'sampleuser',
            email: 'sampleuser@example.com',
            password_hash: 'samplehash',
          },
          category: {
            id: 1,
            name: 'Sample category',
          },
        },
      };
      const updatedComment: Comment = {
        ...foundComment,
        content: 'Updated comment',
      };

      jest
        .spyOn(commentsRepository, 'findOneBy')
        .mockResolvedValue(foundComment);
      jest.spyOn(commentsRepository, 'save').mockResolvedValue(updatedComment);

      const result = await commentsService.update(commentId, updateCommentDto);

      expect(result).toEqual(updatedComment);
      expect(commentsRepository.findOneBy).toHaveBeenCalledWith({
        id: commentId,
      });
      expect(commentsRepository.save).toHaveBeenCalledWith({
        ...foundComment,
        ...updateCommentDto,
      });
    });
  });
});
