import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';

import { FacturaDTO } from './factura.dto';
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';

@Controller('factura')
export class FacturaController {
    public constructor(
        private readonly facturaService: FacturaService,
        private readonly clienteService: ClienteService,
        ) { }

    @Get("get-all")
    public getAllfacturas(): Promise<Factura[]>{
        return this.facturaService.getAll();
    }

    @Get(":id")
    public getById(@Param('id') id: number): Promise<Factura>{
        return this.facturaService.getById(id);
    }

    @Post("new-factura")
    createArticle(@Body() facturaDto: FacturaDTO): Promise<Factura> {
        return this.facturaService.addFactura(facturaDto);
    }

    @Put(":id")
    public updateFactura(@Body() facturaDto: FacturaDTO, @Param('id') id: number): Promise<Factura>{
        return this.facturaService.updateFactura(facturaDto,id);
    }

    @Delete(":id")
    public deleteFactura(@Param('id') id: number){
        return this.facturaService.deleteFactura(id);
    }
}
