import { Test, TestingModule } from '@nestjs/testing';
import { PedidoPersonalizadoController } from './pedido-personalizado.controller';

describe('PedidoPersonalizadoController', () => {
  let controller: PedidoPersonalizadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoPersonalizadoController],
    }).compile();

    controller = module.get<PedidoPersonalizadoController>(PedidoPersonalizadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
