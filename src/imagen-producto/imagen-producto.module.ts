import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenProductoController } from './imagen-producto.controller';
import { ImagenProductoService } from './imagen-producto.service';
import { ImagenProducto } from './imagen.producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ImagenProducto
    ])
],
  controllers: [ImagenProductoController],
  providers: [ImagenProductoService]
})
export class ImagenProductoModule {}
