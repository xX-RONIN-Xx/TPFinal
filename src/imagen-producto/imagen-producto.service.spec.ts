import { Test, TestingModule } from '@nestjs/testing';
import { ImagenProductoService } from './imagen-producto.service';

describe('ImagenProductoService', () => {
  let service: ImagenProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagenProductoService],
    }).compile();

    service = module.get<ImagenProductoService>(ImagenProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
