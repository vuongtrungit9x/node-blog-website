import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByName: jest.fn().mockResolvedValue(null),
            // Add other methods here...
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockReturnValue('testToken'),
            // Add other methods here...
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('validateUser', () => {
    it('should return a user if valid credentials are provided', async () => {
      const username = 'test';
      const password = 'test';
      const hashedPassword = await bcrypt.hash(password, 12);
      const user: User = {
        id: 1,
        email: 'test@example.com',
        username: username,
        password_hash: hashedPassword,
      };

      const userResponse = {
        id: 1,
        email: 'test@example.com',
        username: username,
      };

      jest.spyOn(usersService, 'findOneByName').mockResolvedValue(user);

      const result = await service.validateUser(username, password);
      expect(result).toEqual(userResponse);
    });
  });

  describe('login', () => {
    it('should return an access token if valid credentials are provided', async () => {
      const username = 'test';
      const password = 'test';
      const hashedPassword = await bcrypt.hash(password, 12);
      const user: User = {
        id: 1,
        email: 'test@example.com',
        username: username,
        password_hash: hashedPassword,
      };
      jest.spyOn(usersService, 'findOneByName').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('testToken'); // Change the return value to a resolved promise
      const result = await service.login(username, password);
      expect(result).toEqual({ access_token: 'testToken' });
    });

    it('should throw an UnauthorizedException if invalid credentials are provided', async () => {
      const username = 'test';
      const password = 'test';
      jest.spyOn(usersService, 'findOneByName').mockResolvedValue(null);
      await expect(service.login(username, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
