import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from 'src/cliente/cliente.controller';
import { Cliente } from 'src/cliente/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { ProductoController } from './producto.controller';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Producto,
            Cliente
        ])
    ],
    controllers: [ProductoController, ClienteController],
    providers: [ProductoService, ClienteService]
})
export class ProductoModule { }
