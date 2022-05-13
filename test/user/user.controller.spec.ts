import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/controllers/user.controller';
import { UserService } from '../../src/user/providers/user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
