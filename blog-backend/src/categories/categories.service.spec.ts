import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto = { name: 'Test Category' };

      const expectedResult = { id: 1, name: 'Test Category' };

      jest.spyOn(repository, 'save').mockResolvedValue(expectedResult);

      const result = await service.create(createCategoryDto);

      expect(result).toEqual(expectedResult);
      expect(repository.save).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('update', () => {
    it('should update an existing category', async () => {
      const id = 1;
      const updateCategoryDto = { name: 'Updated Category' };

      const existingCategory = { id: 1, name: 'Test Category' };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(existingCategory);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue({ ...existingCategory, ...updateCategoryDto });

      const result = await service.update(id, updateCategoryDto);

      expect(result).toEqual({ ...existingCategory, ...updateCategoryDto });
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.save).toHaveBeenCalledWith({
        ...existingCategory,
        ...updateCategoryDto,
      });
    });
  });

  describe('delete', () => {
    it('should delete an existing category', async () => {
      const id = 1;

      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.delete(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('findOne', () => {
    it('should find a category by id', async () => {
      const id = 1;
      const expectedResult = { id: 1, name: 'Test Category' };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedResult);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('findAll', () => {
    it('should find all categories', async () => {
      const expectedResult = [
        { id: 1, name: 'Test Category 1' },
        { id: 2, name: 'Test Category 2' },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(repository.find).toHaveBeenCalled();
    });
  });
});
