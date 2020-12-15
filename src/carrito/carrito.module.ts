import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from 'src/cliente/cliente.controller';
import { Cliente } from 'src/cliente/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { ProductoController } from 'src/producto/producto.controller';
import { Producto } from 'src/producto/producto.entity';
import { ProductoService } from 'src/producto/producto.service';
import { CarritoController } from './carrito.controller';
import { Carrito } from './carrito.entity';
import { CarritoService } from './carrito.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
          Carrito,
        ])
      ],
      controllers: [CarritoController /*, ProductoController, ClienteController*/],
      providers: [CarritoService /*, ProductoService, ClienteService*/]
    })
export class CarritoModule {}
