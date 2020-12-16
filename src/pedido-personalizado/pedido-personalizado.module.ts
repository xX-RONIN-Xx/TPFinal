import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoPersonalizadoController } from './pedido-personalizado.controller';
import { PedidoPersonalizado } from './pedido-personalizado.entity';
import { PedidoPersonalizadoService } from './pedido-personalizado.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        PedidoPersonalizado
    ])
],
  controllers: [PedidoPersonalizadoController],
  providers: [PedidoPersonalizadoService]
})
export class PedidoPersonalizadoModule {}
