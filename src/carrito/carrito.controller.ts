import { Controller, Param } from '@nestjs/common';
import { Post, Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
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

    @Delete('vaciar')
    public deleteAll(){
        return this.carritoService.deleteAll();
    }


}
