import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockImplementation((createCategoryDto) => {
              return Promise.resolve({
                id: 1,
                ...createCategoryDto,
              });
            }),
            update: jest.fn().mockImplementation((id, updateCategoryDto) => {
              return Promise.resolve({
                id,
                ...updateCategoryDto,
              });
            }),
            delete: jest.fn().mockResolvedValue(undefined),
            findOne: jest.fn().mockImplementation((id) => {
              return Promise.resolve({
                id,
                name: 'Category',
              });
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto = { name: 'New Category' };
      const result: Category = {
        id: 1,
        name: 'New Category',
      };
      expect(await controller.create(createCategoryDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const id = '1';
      const updateCategoryDto = { name: 'Updated Category' };
      const result: Category = {
        id: 1,
        name: 'Updated Category',
      };
      expect(await controller.update(id, updateCategoryDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(result.id, updateCategoryDto);
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const id = '1';
      const idExpected = 1;
      await controller.delete(id);
      expect(service.delete).toHaveBeenCalledWith(idExpected);
    });
  });

  describe('findOne', () => {
    it('should find a category by id', async () => {
      const id = '1';
      const result: Category = {
        id: 1,
        name: 'Category',
      };
      expect(await controller.findOne(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(result.id);
    });
  });
});
