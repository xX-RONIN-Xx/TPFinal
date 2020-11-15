import { Controller, Param } from '@nestjs/common';
import { Post, Delete, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Carrito } from './carrito';
import { CarritoService } from './carrito.service';

@Controller('carrito')
export class CarritoController {
    constructor(private carritoService: CarritoService) { }
    @Get()
    public getCarrito(): Carrito[] {
        return this.carritoService.getCarrito();
    }

    @Post()
    create(@Body() car: any): string {
        return this.carritoService.create(car);
    }

    @Delete(':index')
    public delete1deCarrito(@Param('index') index): boolean{
        return this.carritoService.delete1deCarrito(parseInt(index));
    }

    @Delete(':index')
    public deleteAll(@Param('index') index): boolean{
        return this.carritoService.deleteAll(parseInt(index));
    }

    @Put(':index')
    public updateCarrito(@Body() car: any, @Param('index') index): boolean{
        return this.carritoService.updateCarrito(parseInt(index), car);
    }


}
