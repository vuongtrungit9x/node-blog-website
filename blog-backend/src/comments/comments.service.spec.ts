import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const comment = { content: 'New comment' };
      const createdComment = await service.create(comment);
      expect(createdComment).toHaveProperty('id');
      expect(createdComment.content).toEqual(comment.content);
    });
  });

  describe('findAll', () => {
    it('should return an array of comments', async () => {
      const comments = await service.findAll();
      expect(comments).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a comment by id', async () => {
      const commentId = 1;
      const comment = await service.findOne(commentId);
      expect(comment).toBeDefined();
      expect(comment.id).toEqual(commentId);
    });
  });

  describe('remove', () => {
    it('should remove a comment by id', async () => {
      const commentId = 1;
      await service.remove(commentId);
      const comment = await service.findOne(commentId);
      expect(comment).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a comment by id', async () => {
      const commentId = 1;
      const updatedComment = { content: 'Updated comment' };
      const comment = await service.update(commentId, updatedComment);
      expect(comment).toBeDefined();
      expect(comment.id).toEqual(commentId);
      expect(comment.content).toEqual(updatedComment.content);
    });
  });
});
