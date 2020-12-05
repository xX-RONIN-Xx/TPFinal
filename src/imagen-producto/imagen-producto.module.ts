import { Module } from '@nestjs/common';
import { ImagenProductoController } from './imagen-producto.controller';
import { ImagenProductoService } from './imagen-producto.service';

@Module({
  controllers: [ImagenProductoController],
  providers: [ImagenProductoService]
})
export class ImagenProductoModule {}
