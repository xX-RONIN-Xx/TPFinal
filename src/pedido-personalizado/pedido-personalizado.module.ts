import { Module } from '@nestjs/common';
import { PedidoPersonalizadoController } from './pedido-personalizado.controller';
import { PedidoPersonalizadoService } from './pedido-personalizado.service';

@Module({
  controllers: [PedidoPersonalizadoController],
  providers: [PedidoPersonalizadoService]
})
export class PedidoPersonalizadoModule {}
