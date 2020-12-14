import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoController } from 'src/carrito/carrito.controller';
import { Carrito } from 'src/carrito/carrito.entity';
import { CarritoService } from 'src/carrito/carrito.service';
import { FacturaController } from 'src/factura/factura.controller';
import { Factura } from 'src/factura/factura.entity';
import { FacturaService } from 'src/factura/factura.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      Factura,
      Carrito,
    ])
  ],
  controllers: [ClienteController,FacturaController,CarritoController],
  providers: [ClienteService,FacturaService,CarritoService]
})
export class ClienteModule { }
