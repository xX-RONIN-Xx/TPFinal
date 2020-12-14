import { Controller } from '@nestjs/common';
import { Delete, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { ImagenProductoDTO } from './imagen-producto.dto';
import { ImagenProductoService } from './imagen-producto.service';
import { ImagenProducto } from './imagen.producto.entity';

@Controller('imagen-producto')
export class ImagenProductoController {
    constructor(private readonly imagenProductoService: ImagenProductoService) { }

    @Get("get-all")
    public getAll(): Promise<ImagenProducto[]>{
        return this.imagenProductoService.getAll();
    }

    @Get(":id")
    public getById(@Param('id') id: number): Promise<ImagenProducto>{
        return this.imagenProductoService.getById(id);
    }

    @Post("new-imagen")
    createArticle(@Body() imagenProductoDto: ImagenProductoDTO): Promise<ImagenProducto> {
        return this.imagenProductoService.addImagen(imagenProductoDto);
    }

    @Put(":id")
    public updateImagen(@Body() imagenProductoDto: ImagenProductoDTO, @Param('id') id: number): Promise<ImagenProducto>{
        return this.imagenProductoService.updateImagen(imagenProductoDto,id);
    }

    @Delete(":id")
    public deleteImagen(@Param('id') id: number){
        return this.imagenProductoService.deleteImagen(id);
    }
}
