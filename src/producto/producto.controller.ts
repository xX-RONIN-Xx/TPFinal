import { Controller, Param } from '@nestjs/common';
import { Delete, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ProductoDTO } from './producto.dto';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';


@Controller('producto')
export class ProductoController {
    constructor(
        private readonly productoService: ProductoService,
        ) { }
   /* @Get()
    public getProductos(): Producto[] {
        return this.productoService.getProductos();
    }

   //@Get(':index')
    //public getProducto(@Param('index') index): Producto {
    //    return this.productoService.getProducto(parseInt(index));
    //}
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

    @Put(':index')
    public updateProducto(@Body() prod: any): boolean {
        return this.productoService.updateProduct(prod);
    }
    @Put(':index')
    public updateProducto(@Body() prod: any, @Param('index') index): boolean {
        return this.productoService.updateProducto(prod, index);
    }*/

    @Get("get-all")
    public getAll(): Promise<Producto[]>{
        return this.productoService.getAll();
    }

    @Get(":id")
    public getById(@Param('id') id: number): Promise<Producto>{
        return this.productoService.getById(id);
    }

    @Post("new-producto")
    createArticle(@Body() productoDto: ProductoDTO): Promise<Producto> {
        return this.productoService.addProducto(productoDto);
    }

    @Put(":id")
    public updateProducto(@Body() productoDto: ProductoDTO, @Param('id') id: number): Promise<Producto>{
        return this.productoService.updateProducto(productoDto,id);
    }

    @Delete(":id")
    public deleteProducto(@Param('id') id: number){
        return this.productoService.deleteProducto(id);
    }
}
