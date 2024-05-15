import { Test, TestingModule } from '@nestjs/testing';
import { PostTagsService } from './post-tags.service';

describe('PostTagsService', () => {
  let service: PostTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostTagsService],
    }).compile();

    service = module.get<PostTagsService>(PostTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
