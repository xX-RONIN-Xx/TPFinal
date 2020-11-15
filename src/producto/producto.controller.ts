import { Controller, Param } from '@nestjs/common';
import { Delete, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Producto } from './Producto';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
    constructor(private productoService: ProductoService) { }
    @Get()
    public getProductos(): Producto[] {
        return this.productoService.getProductos();
    }

    @Get(':index')
    public getProducto(@Param('index') index): Producto {
        return this.productoService.getProducto(parseInt(index));
    }

    @Post()
    create(@Body() prod: any): string {
        return this.productoService.create(prod);
    }

    @Delete(':index')
    public deleteProducto(@Param('index') index): boolean {
        return this.productoService.deleteProducto(parseInt(index));
    }
}
