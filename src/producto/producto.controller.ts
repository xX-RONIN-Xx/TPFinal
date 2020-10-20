import { Controller, Param } from '@nestjs/common';
import { Delete, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Controller('productos') //localhost:3000/productos
export class ProductoController {
    constructor(private productoService: ProductoService) { }
    @Get()
    public getProductos(): Producto[] {
        return this.productoService.getProductos();
    }

    @Get(':index')
    public getProducto(@Param('index') index): Producto{
        return this.productoService.getProducto(parseInt(index));
    }

    @Post()
    public create(@Body() prod: any): string {
        return this.productoService.create(prod);
    }

    @Delete(':index')
    public deleteProducto(@Param('index') index): boolean{
        return this.productoService.deleteProducto(parseInt(index));
    }

    @Put(':index')
    public updateProducto(@Body() prod: any, @Param('index') index): boolean{
        return this.productoService.updateProducto(parseInt(index), prod);
    }

}
