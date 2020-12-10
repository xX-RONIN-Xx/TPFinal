import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoController } from './carrito.controller';
import { Carrito } from './carrito.entity';
import { CarritoService } from './carrito.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
          Carrito
        ])
      ],
      controllers: [CarritoController],
      providers: [CarritoService]
    })
export class CarritoModule {}
