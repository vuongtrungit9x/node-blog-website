// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { JwtService } from '@nestjs/jwt'; // Import JwtService from the appropriate package

// describe('UsersController', () => {
//   let controller: UsersController;
//   let service: UsersService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [
//         {
//           provide: UsersService,
//           useValue: {
//             findAll: jest.fn().mockResolvedValue([]),
//             // Add other methods here...
//           },
//         },
//         JwtService, // Add JwtService as a provider
//       ],
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//     service = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('findAll', () => {
//     it('should return an array of users', async () => {
//       const result = [];
//       jest.spyOn(service, 'findAll').mockResolvedValue(result);

//       expect(await controller.findAll()).toBe(result);
//     });
//   });
// });
