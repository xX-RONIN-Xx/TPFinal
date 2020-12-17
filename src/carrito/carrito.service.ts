import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { CarritoDTO } from './carrito.dto';
import { Carrito } from './carrito.entity';




@Injectable()
export class CarritoService {
    constructor(
        @InjectRepository(Carrito)
        private readonly carritoRepository: Repository<Carrito>
    ) { }
   
    //TYPEORM GET
    public async getAll(): Promise<Carrito[]> {
        console.log("Get All carritos");
        try {
            //Get all
            const result: Carrito[] = await this.carritoRepository.find({
                relations: ["producto"]
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
    public async getById(id: number): Promise<Carrito> {
        console.log("Getting carrito id: " + id);
        try {
            const carrito: Carrito = await this.carritoRepository.findOne(id);
            if (carrito) {
                return carrito;
            } else {
                throw new HttpException('No se pudo encontrar el carrito', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //Add carrito
    public async addCarrito(newCarrito: CarritoDTO): Promise<Carrito> {
        try {
            const carritoCreado: Carrito = await this.carritoRepository.save(
                new Carrito(
                    newCarrito.cantidad,
                    newCarrito.cliente_id_cliente,
                    newCarrito.producto_id_producto,
                    newCarrito.estado
                )
            );

            if (carritoCreado.getId()) {
                return carritoCreado;
            } else {
                throw new HttpException('No se pudo crear el carrito', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //#### Update carrito ####
    public async updateCarrito(newCarritoParams: CarritoDTO, id: number): Promise<Carrito> {
        try {
            let carrito: Carrito = await this.getById(id);

            if (carrito.getId()) {
                carrito.setCantidad(newCarritoParams.cantidad);
                carrito.setEstado(newCarritoParams.estado);

                const carritoUpdated: Carrito = await this.carritoRepository.save(carrito);

                if (carritoUpdated) {
                    return carritoUpdated;
                } else {
                    throw new HttpException('No se pudo crear el carrito', HttpStatus.NOT_MODIFIED);
                }
            } else {
                throw new HttpException('No se pudo crear el carrito', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    // #### Delete carrito ####
    public async deleteCarrito(id: number) {
        try {
            let carrito: Carrito = await this.getById(id);
            if (carrito.getId()) {
                let deleteResult = await this.carritoRepository.delete(id);
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
