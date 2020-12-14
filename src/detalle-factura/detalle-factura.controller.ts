import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DetalleFacturaDTO } from './detalle-factura.dto';
import { DetalleFactura } from './detalle-factura.entity';
import { DetalleFacturaService } from './detalle-factura.service';

@Controller('detalle-factura')
export class DetalleFacturaController {
    public constructor(private readonly detalleFacturaService: DetalleFacturaService) { }

    @Get("get-all")
    public getAllDetalleFacturas(): Promise<DetalleFactura[]>{
        return this.detalleFacturaService.getAll();
    }

    @Get(":id")
    public getById(@Param('id') id: number): Promise<DetalleFactura>{
        return this.detalleFacturaService.getById(id);
    }

    @Post("new-detalle")
    createArticle(@Body() detalleFacturaDto: DetalleFacturaDTO): Promise<DetalleFactura> {
        return this.detalleFacturaService.addDetalleFactura(detalleFacturaDto);
    }

    @Put(":id")
    public updateDetalleFactura(@Body() detalleFacturaDto: DetalleFacturaDTO, @Param('id') id: number): Promise<DetalleFactura>{
        return this.detalleFacturaService.updateDetalleFactura(detalleFacturaDto,id);
    }

    @Delete(":id")
    public deleteDetalleFactura(@Param('id') id: number){
        return this.detalleFacturaService.deleteDetalleFactura(id);
    }

}
