import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Carrito } from 'src/carrito/carrito.entity';
import { Repository } from 'typeorm';
import { ClienteDTO } from './cliente.dto';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>
    ) { }



    //TYPEORM GET
    public async getAll(): Promise<Cliente[]> {
        console.log("Get All clientes");
        /* try {
             //Get all
             const result: Cliente[] = await this.clienteRepository.find();
             return result
 
         } catch (error) {
             throw new HttpException({
                 status: HttpStatus.NOT_FOUND,
                 error: "there is an error in the request, " + error,
               }, HttpStatus.NOT_FOUND);
         }*/

        try {

            const result = await this.clienteRepository.find({
                relations: ["facturas",
                "carrito"
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
    public async getById(id: number): Promise<Cliente> {
        console.log("Getting cliente id: " + id);
        try {
            const cliente: Cliente = await this.clienteRepository.findOne(id);
            if (cliente) {
                return cliente;
            } else {
                throw new HttpException('No se pudo encontrar el cliente', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //Add cliente
    public async addCliente(newCliente: ClienteDTO): Promise<Cliente> {
        try {
            const clienteCreada: Cliente = await this.clienteRepository.save(
                new Cliente(
                    newCliente.usuario,
                    newCliente.pass,
                    newCliente.administrador
                )
            );

            if (clienteCreada.getId()) {
                return clienteCreada;
            } else {
                throw new HttpException('No se pudo crear el cliente', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //#### Update cliente ####
    public async updateCliente(newClienteParams: ClienteDTO, id: number): Promise<Cliente> {
        try {
            let cliente: Cliente = await this.getById(id);

            if (cliente.getId()) {
                cliente.setUsuario(newClienteParams.usuario);
                cliente.setPass(newClienteParams.pass);
                cliente.setAdmin(newClienteParams.administrador);

                const clienteUpdated: Cliente = await this.clienteRepository.save(cliente);

                if (clienteUpdated) {
                    return clienteUpdated;
                } else {
                    throw new HttpException('No se pudo crear el cliente', HttpStatus.NOT_MODIFIED);
                }
            } else {
                throw new HttpException('No se pudo crear el cliente', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    // #### Delete cliente ####
    public async deleteCliente(id: number) {
        try {
            let cliente: Cliente = await this.getById(id);
            if (cliente.getId()) {
                let deleteResult = await this.clienteRepository.delete(id);
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
