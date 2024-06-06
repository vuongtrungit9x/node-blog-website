import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<PostEntity>>(
      getRepositoryToken(PostEntity),
    );
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const post: Partial<PostEntity> = {
        title: 'New Post',
        content: 'Lorem ipsum dolor sit amet',
      };
      const createdPost: PostEntity = { id: 1, ...post } as PostEntity;

      jest.spyOn(repository, 'save').mockResolvedValue(createdPost);

      const result = await service.create(post);

      expect(repository.save).toHaveBeenCalledWith(post);
      expect(result).toEqual(createdPost);
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const posts: PostEntity[] = [
        {
          id: 1,
          title: 'Post 1',
          content: 'Lorem ipsum dolor sit amet',
          created_at: new Date(),
          updated_at: new Date(),
          user: {
            id: 1,
            username: 'user1',
            email: 'user1@example.com',
            password_hash: 'password123',
          },
          category: {
            id: 1,
            name: 'Category 1',
          },
        },
        {
          id: 2,
          title: 'Post 2',
          content: 'Lorem ipsum dolor sit amet',
          created_at: new Date(),
          updated_at: new Date(),
          user: {
            id: 2,
            username: 'user2',
            email: 'user2@example.com',
            password_hash: 'password456',
          },
          category: {
            id: 1,
            name: 'Category 1',
          },
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(posts);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(posts);
    });
  });

  describe('findOne', () => {
    it('should return a post by id', async () => {
      const postId = 1;
      const post: PostEntity = {
        id: postId,
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet',
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          id: 1,
          username: 'user1',
          email: 'user1@example.com',
          password_hash: 'password123',
        },
        category: {
          id: 1,
          name: 'Category 1',
        },
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(post);

      const result = await service.findOne(postId);

      expect(repository.findOne).toHaveBeenCalledWith({
        relations: ['user', 'category'],
        where: { id: postId },
      });
      expect(result).toEqual(post);
    });
  });

  describe('remove', () => {
    it('should remove a post by id', async () => {
      const postId = 1;

      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.remove(postId);

      expect(repository.delete).toHaveBeenCalledWith(postId);
    });
  });

  describe('update', () => {
    it('should update a post by id', async () => {
      const postId = 1;
      const updatePostDto: Partial<PostEntity> = { title: 'Updated Post' };
      const updatedPost: PostEntity = {
        id: postId,
        title: 'Updated Post',
        content: 'Lorem ipsum dolor sit amet',
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          id: 1,
          username: 'user1',
          email: 'user1@example.com',
          password_hash: 'password123',
        },
        category: {
          id: 1,
          name: 'Category 1',
        },
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedPost);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedPost);

      const result = await service.update(postId, updatePostDto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: postId });
      expect(repository.save).toHaveBeenCalledWith(updatedPost);
      expect(result).toEqual(updatedPost);
    });
  });
});
