import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from 'src/cliente/cliente.controller';
import { Cliente } from 'src/cliente/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { CarritoController } from './carrito.controller';
import { Carrito } from './carrito.entity';
import { CarritoService } from './carrito.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
          Carrito,
          Cliente
        ])
      ],
      controllers: [CarritoController,ClienteController],
      providers: [CarritoService,ClienteService]
    })
export class CarritoModule {}
