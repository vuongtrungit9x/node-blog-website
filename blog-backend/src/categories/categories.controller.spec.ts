import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto = { name: 'Test Category' };
    const createdCategory = await controller.create(createCategoryDto);
    expect(createdCategory).toBeDefined();
    expect(createdCategory.name).toEqual(createCategoryDto.name);
  });

  it('should update a category', async () => {
    const categoryId = '1';
    const updateCategoryDto = { name: 'Updated Category' };
    const updatedCategory = await controller.update(
      categoryId,
      updateCategoryDto,
    );
    expect(updatedCategory).toBeDefined();
    expect(updatedCategory.name).toEqual(updateCategoryDto.name);
  });

  it('should delete a category', async () => {
    const categoryId = '1';
    await expect(controller.delete(categoryId)).resolves.toBeUndefined();
  });

  it('should find a category by ID', async () => {
    const categoryId = '1';
    const foundCategory = await controller.findOne(categoryId);
    expect(foundCategory).toBeDefined();
    expect(foundCategory.id).toEqual(categoryId);
  });

  it('should find all categories', async () => {
    const categories = await controller.findAll();
    expect(categories).toBeDefined();
    expect(categories.length).toBeGreaterThan(0);
  });
});
