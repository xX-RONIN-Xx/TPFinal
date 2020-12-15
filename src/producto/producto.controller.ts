import { Controller, Param } from '@nestjs/common';
import { Delete, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { from } from 'rxjs';
import { ProductoDTO } from './producto.dto';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { ImagenProducto } from 'src/imagen-producto/imagen.producto.entity';
import { ImagenProductoDTO } from 'src/imagen-producto/imagen-producto.dto';


@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) { }

    @Get("get-all")
    public getAll(): Promise<Producto[]>{

        let productos=this.productoService.getAll();
        console.log(productos);
        return productos;
    }

    @Get(":id")
    public getById(@Param('id') id: number): Promise<Producto>{
        let producto=this.productoService.getById(id);
        console.log(producto);
        return producto;
    }

    @Post("new-producto")
    addProduct(@Body() producto: ProductoDTO): Promise<Producto> {
        console.log(JSON.stringify(ProductoDTO));
        return this.productoService.addProduct(producto);
    }

    @Put(":id")
    public updateProducto(@Body() productoDto: ProductoDTO, @Param('id') id: number): Promise<Producto>{
        return this.productoService.updateProducto(productoDto,id);
    }

    @Delete(":id")
    public deleteProducto(@Param('id') id){
        console.log('entro al controller')
        return this.productoService.deleteProducto(id);
    }
}
