import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClienteDTO } from './cliente.dto';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
    public constructor(private readonly clienteService: ClienteService) { }

    @Get("get-all")
    public getAllclientes(): Promise<Cliente[]>{
        return this.clienteService.getAll();
    }

    @Get(":id")
    public getById(@Param('id') id: number): Promise<Cliente>{
        return this.clienteService.getById(id);
    }

    @Post("new-cliente")
    createArticle(@Body() clienteDto: ClienteDTO): Promise<Cliente> {
        return this.clienteService.addCliente(clienteDto);
    }

    @Put(":id")
    public updateCliente(@Body() clienteDto: ClienteDTO, @Param('id') id: number): Promise<Cliente>{
        return this.clienteService.updateCliente(clienteDto,id);
    }

    @Delete(":id")
    public deleteCliente(@Param('id') id: number){
        return this.clienteService.deleteCliente(id);
    }
}
