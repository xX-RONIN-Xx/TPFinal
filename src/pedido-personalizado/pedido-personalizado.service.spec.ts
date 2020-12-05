import { Test, TestingModule } from '@nestjs/testing';
import { PedidoPersonalizadoService } from './pedido-personalizado.service';

describe('PedidoPersonalizadoService', () => {
  let service: PedidoPersonalizadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoPersonalizadoService],
    }).compile();

    service = module.get<PedidoPersonalizadoService>(PedidoPersonalizadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
