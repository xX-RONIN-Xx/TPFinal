import { Test, TestingModule } from '@nestjs/testing';
import { ImagenProductoController } from './imagen-producto.controller';

describe('ImagenProductoController', () => {
  let controller: ImagenProductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagenProductoController],
    }).compile();

    controller = module.get<ImagenProductoController>(ImagenProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
