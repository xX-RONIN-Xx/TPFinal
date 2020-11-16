import { Controller, Param } from '@nestjs/common';
import { Delete, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { from } from 'rxjs';
import { Producto } from './producto';
import { ProductoService } from './producto.service';


@Controller('productos')
export class ProductoController {
    constructor(private productoService: ProductoService) { }
    @Get()
    public getProductos(): Producto[] {
        return this.productoService.getProductos();
    }

    /*@Get(':index')
    public getProducto(@Param('index') index): Producto {
        return this.productoService.getProducto(parseInt(index));
    }*/
    @Get(':index')
    public getProducto(@Param('index') index): Producto {
        return this.productoService.getProducto(index);
    }

    @Post()
    create(@Body() prod: any): string {
        return this.productoService.create(prod);
    }

    @Delete(':index')
    public deleteProducto(@Param('index') index): boolean {
        return this.productoService.deleteProducto(parseInt(index));
    }

    /*@Put(':index')
    public updateProducto(@Body() prod: any): boolean {
        return this.productoService.updateProduct(prod);
    }*/
    @Put(':index')
    public updateProducto(@Body() prod: any,@Param('index') index): boolean {
        return this.productoService.updateProducto(prod,index);
    }
}
