import { Test, TestingModule } from '@nestjs/testing';
import { PictureService } from '../../src/picture/providers/picture.service';

describe('PictureService', () => {
  let service: PictureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PictureService],
    }).compile();

    service = module.get<PictureService>(PictureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
