import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto = { name: 'Test Category' };
    const createdCategory = await service.create(createCategoryDto);
    expect(createdCategory).toBeDefined();
    expect(createdCategory.name).toEqual(createCategoryDto.name);
  });

  it('should update a category', async () => {
    const categoryId = 1;
    const updateCategoryDto = { name: 'Updated Category' };
    const updatedCategory = await service.update(categoryId, updateCategoryDto);
    expect(updatedCategory).toBeDefined();
    expect(updatedCategory.name).toEqual(updateCategoryDto.name);
  });

  it('should delete a category', async () => {
    const categoryId = 1;
    await service.delete(categoryId);
    const deletedCategory = await service.findOne(categoryId);
    expect(deletedCategory).toBeUndefined();
  });

  it('should find a category by id', async () => {
    const categoryId = 1;
    const foundCategory = await service.findOne(categoryId);
    expect(foundCategory).toBeDefined();
    expect(foundCategory.id).toEqual(categoryId);
  });

  it('should find all categories', async () => {
    const categories = await service.findAll();
    expect(categories).toBeDefined();
    expect(categories.length).toBeGreaterThan(0);
  });
});
