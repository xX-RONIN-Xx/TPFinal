import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DetalleFacturaDTO } from './detalle-factura.dto';
import { DetalleFactura } from './detalle-factura.entity';
import { DetalleFacturaService } from './detalle-factura.service';

@Controller('detalle-factura')
export class DetalleFacturaController {
    public constructor(private readonly categoriaService: DetalleFacturaService) { }

    @Get("get-all")
    public getAllDetalleFacturas(): Promise<DetalleFactura[]>{
        return this.categoriaService.getAll();
    }

    @Get(":id")
    public getById(@Param('id') id: number): Promise<DetalleFactura>{
        return this.categoriaService.getById(id);
    }

    @Post("new-categoria")
    createArticle(@Body() categoriaDto: DetalleFacturaDTO): Promise<DetalleFactura> {
        return this.categoriaService.addDetalleFactura(categoriaDto);
    }

    @Put(":id")
    public updateDetalleFactura(@Body() categoriaDto: DetalleFacturaDTO, @Param('id') id: number): Promise<DetalleFactura>{
        return this.categoriaService.updateDetalleFactura(categoriaDto,id);
    }

    @Delete(":id")
    public deleteDetalleFactura(@Param('id') id: number){
        return this.categoriaService.deleteDetalleFactura(id);
    }

}
