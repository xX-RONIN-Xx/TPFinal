import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { Repository } from 'typeorm';
import { FacturaDTO } from './factura.dto';
import { Factura } from './factura.entity';

@Injectable()
export class FacturaService {

    constructor(
        @InjectRepository(Factura) 
        private readonly facturaRepository: Repository<Factura>,

        @InjectRepository(Cliente) 
        private readonly clienteRepository: Repository<Cliente>,

    ){}



    //TYPEORM GET
    public async getAll(): Promise<Factura[]>{
        console.log("Get All facturas");
        /*try {
            //Get all
            const result: Factura[] = await this.facturaRepository.find();
            return result

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }*/

        try {
                
            const result= await this.facturaRepository.find({
                relations: [
                           "detalleFactura",
                           //"cliente"
            ]
            });
            return result
            
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //TYPEORM GET by id
    public async getById(id: number): Promise<Factura>{
        console.log("Getting factura id: " + id);
        try {
            const factura: Factura = await this.facturaRepository.findOne(id);
            if(factura){
                return factura;
            }else{
                throw new HttpException('No se pudo encontrar el factura', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

    //Add factura
    public async addFactura(newFactura: FacturaDTO):Promise<Factura>{
        try {
            const facturaCreada: Factura = await this.facturaRepository.save(
                new Factura(
                    newFactura.fecha,
                    newFactura.cliente_id_cliente,
                    )
            );

            if(facturaCreada.getId()){
                return facturaCreada;
            }else{
                throw new HttpException('No se pudo crear el factura', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }        
    }

    //#### Update factura ####
    public async updateFactura(newFacturaParams: FacturaDTO, id: number): Promise<Factura>{
        try {
            let factura: Factura = await this.getById(id);

            if(factura.getId()){
                factura.setFecha(newFacturaParams.fecha);
                factura.setCliente(newFacturaParams.cliente_id_cliente);


                const facturaUpdated: Factura = await this.facturaRepository.save(factura);

                if (facturaUpdated) {
                    return facturaUpdated;
                }else {
                    throw new HttpException('No se pudo crear el factura', HttpStatus.NOT_MODIFIED);    
                }                
            }else{
                throw new HttpException('No se pudo crear el factura', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }        
    }

    // #### Delete factura ####
    public async deleteFactura(id: number){        
        try {
            let factura: Factura = await this.getById(id);
            if (factura.getId()) {
                let deleteResult = await this.facturaRepository.delete(id);
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
