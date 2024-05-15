import { Test, TestingModule } from '@nestjs/testing';
import { PostTagsController } from './post-tags.controller';

describe('PostTagsController', () => {
  let controller: PostTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostTagsController],
    }).compile();

    controller = module.get<PostTagsController>(PostTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
