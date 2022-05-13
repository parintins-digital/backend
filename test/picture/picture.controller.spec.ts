import { Test, TestingModule } from '@nestjs/testing';
import { PictureController } from '../../src/picture/controllers/picture.controller';
import { PictureService } from '../../src/picture/providers/picture.service';

describe('PictureController', () => {
  let controller: PictureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PictureController],
      providers: [PictureService],
    }).compile();

    controller = module.get<PictureController>(PictureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
