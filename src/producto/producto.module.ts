import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenProductoController } from 'src/imagen-producto/imagen-producto.controller';
import { ImagenProductoService } from 'src/imagen-producto/imagen-producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { ImagenProducto } from 'src/imagen-producto/imagen.producto.entity';
import { Categoria } from 'src/categoria/categoria.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Producto,
            ImagenProducto,
            Categoria
        ])
    ],
    controllers: [ProductoController, ImagenProductoController],
    providers: [ProductoService, ImagenProductoService]
})
export class ProductoModule { }
