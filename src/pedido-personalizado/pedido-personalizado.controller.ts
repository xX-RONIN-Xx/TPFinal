import { Controller } from '@nestjs/common';
import { Delete, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { PedidoPersonalizadoDTO } from './pedido-personalizado.dto';
import { PedidoPersonalizadoService} from './pedido-personalizado.service'
import { PedidoPersonalizado } from './pedido-personalizado.entity';

@Controller('pedido-personalizado')
export class PedidoPersonalizadoController {
    constructor(private readonly pedidoPersonalizadoService: PedidoPersonalizadoService) { }

    

    @Get("get-all")
    public getAll(): Promise<PedidoPersonalizado[]>{

        let pedidos=this.pedidoPersonalizadoService.getAll();
        console.log(pedidos);
        return pedidos;
    }



    @Post("new-pedido")
    addPedido(@Body() pedidoPersonalizado: PedidoPersonalizadoDTO): Promise<PedidoPersonalizado> {
        console.log(JSON.stringify(PedidoPersonalizadoDTO));
        return this.pedidoPersonalizadoService.addPedido(pedidoPersonalizado);
    }

    @Delete(":id")
    public deletePedido(@Param('id') id){
        console.log('entro al controller')
        return this.pedidoPersonalizadoService.deletePedido(id);
    }
}


