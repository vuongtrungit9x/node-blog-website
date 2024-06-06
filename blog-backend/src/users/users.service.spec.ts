import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user: Partial<User> = {
        username: 'Test',
        password_hash: 'password',
        email: 'test@gmail.com',
      };
      const savedUser: User = {
        id: 1,
        username: 'Test',
        password_hash: 'password',
        email: 'test@gmail.com',
      };

      jest.spyOn(repo, 'create').mockReturnValue(user as User);
      jest.spyOn(repo, 'save').mockResolvedValue(savedUser as any);

      const result = await service.create(user);
      expect(result).toEqual(savedUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 1;
      const updateUserDto: Partial<User> = {
        username: 'UpdatedTest',
        password_hash: 'updatedPassword',
        email: 'updatedtest@gmail.com',
      };
      const existingUser: User = {
        id: 1,
        username: 'Test',
        password_hash: 'password',
        email: 'test@gmail.com',
      };
      const updatedUser: User = {
        id: 1,
        username: 'UpdatedTest',
        password_hash: 'updatedPassword',
        email: 'updatedtest@gmail.com',
      };
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(existingUser);
      jest.spyOn(repo, 'save').mockResolvedValue(updatedUser as any);
      const result = await service.update(id, updateUserDto);
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if user does not exist', async () => {
      const id = 1;
      const updateUserDto: Partial<User> = {
        username: 'UpdatedTest',
        password_hash: 'updatedPassword',
        email: 'updatedtest@gmail.com',
      };
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);
      await expect(service.update(id, updateUserDto)).rejects.toThrowError();
    });
  });
});
