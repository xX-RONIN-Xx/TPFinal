import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleFactura } from './detalle-entity';
import { DetalleFacturaDTO } from './detalle-factura.dto';

@Injectable()
export class DetalleFacturaService {
    

    constructor(
        @InjectRepository(DetalleFactura) 
        private readonly detalleFacturaRepository: Repository<DetalleFactura>
    ){}



    //TYPEORM GET
    public async getAll(): Promise<DetalleFactura[]>{
        console.log("Get All detalleFacturas");
        try {
            //Get all
            const result: DetalleFactura[] = await this.detalleFacturaRepository.find();
            return result

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

    //TYPEORM GET by id
    public async getById(id: number): Promise<DetalleFactura>{
        console.log("Getting detalleFactura id: " + id);
        try {
            const detalleFactura: DetalleFactura = await this.detalleFacturaRepository.findOne(id);
            if(detalleFactura){
                return detalleFactura;
            }else{
                throw new HttpException('No se pudo encontrar el detalleFactura', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

    //Add detalleFactura
    public async addDetalleFactura(newDetalleFactura: DetalleFacturaDTO):Promise<DetalleFactura>{
        try {
            const detalleFacturaCreada: DetalleFactura = await this.detalleFacturaRepository.save(
                new DetalleFactura(
                    newDetalleFactura.cantidad

                    )
            );

            if(detalleFacturaCreada.getId()){
                return detalleFacturaCreada;
            }else{
                throw new HttpException('No se pudo crear el detalleFactura', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }        
    }

    //#### Update detalleFactura ####
    public async updateDetalleFactura(newDetalleFacturaParams: DetalleFacturaDTO, id: number): Promise<DetalleFactura>{
        try {
            let detalleFactura: DetalleFactura = await this.getById(id);

            if(detalleFactura.getId()){
                detalleFactura.setCantidad(newDetalleFacturaParams.cantidad);

                const detalleFacturaUpdated: DetalleFactura = await this.detalleFacturaRepository.save(detalleFactura);

                if (detalleFacturaUpdated) {
                    return detalleFacturaUpdated;
                }else {
                    throw new HttpException('No se pudo crear el detalleFactura', HttpStatus.NOT_MODIFIED);    
                }                
            }else{
                throw new HttpException('No se pudo crear el detalleFactura', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }        
    }

    // #### Delete detalleFactura ####
    public async deleteDetalleFactura(id: number){        
        try {
            let detalleFactura: DetalleFactura = await this.getById(id);
            if (detalleFactura.getId()) {
                let deleteResult = await this.detalleFacturaRepository.delete(id);
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
