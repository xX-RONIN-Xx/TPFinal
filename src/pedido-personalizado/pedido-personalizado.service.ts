import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoPersonalizadoDTO } from './pedido-personalizado.dto';
import { PedidoPersonalizado } from './pedido-personalizado.entity';

@Injectable()
export class PedidoPersonalizadoService {

    constructor(
        @InjectRepository(PedidoPersonalizado) 
        private readonly pedidoPersonalizadoRepository: Repository<PedidoPersonalizado>
    ){}

    //TYPEORM GET
    public async getAll(): Promise<PedidoPersonalizado[]>{
        console.log("Get All productos");
        try {
            //Get all
            const result: PedidoPersonalizado[] = await this.pedidoPersonalizadoRepository.find();
            return result

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }


    //TYPEORM GET by id
    public async getById(id: number): Promise<PedidoPersonalizado>{
        console.log("Getting producto id: " + id);
        try {
            const pedido: PedidoPersonalizado = await this.pedidoPersonalizadoRepository.findOne(id);
            if(pedido){
                return pedido;
            }else{
                throw new HttpException('No se pudo encontrar el pedido', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

    //Add Pedido
    public async addPedido(newPedido: PedidoPersonalizadoDTO):Promise<PedidoPersonalizado>{
        try {
            const pedidoCreado: PedidoPersonalizado = await this.pedidoPersonalizadoRepository.save(
                new PedidoPersonalizado(
                    newPedido.dimesion_x,
                    newPedido.dimension_y,
                    newPedido.dimension_z,
                    newPedido.colores,
                    newPedido.tipo_filamento,
                    newPedido.altura_capa,
                    newPedido.temperatura,
                    newPedido.relleno,
                    newPedido.comentarios,
                    newPedido.cliente_id_cliente,


                    )
            );

            if(pedidoCreado.getId()){
                return pedidoCreado;
            }else{
                throw new HttpException('No se pudo crear la imagen', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }        
    }

    // #### Delete producto ####
    public async deletePedido(id: number){        
        try {
            let pedido: PedidoPersonalizado = await this.getById(id);
            if (pedido.getId()) {
                let deleteResult = await this.pedidoPersonalizadoRepository.delete(id);
                if (deleteResult.affected) {


                }
                return deleteResult;
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

}
