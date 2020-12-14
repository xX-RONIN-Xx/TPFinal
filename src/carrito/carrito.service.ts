import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Cliente } from 'src/cliente/cliente.entity';
import { Repository } from 'typeorm';
import { CarritoDTO } from './carrito.dto';
import { Carrito } from './carrito.entity';




@Injectable()
export class CarritoService {
    constructor(
        @InjectRepository(Carrito)
        private readonly carritoRepository: Repository<Carrito>,
    ) { }
    /*

    private listaDelCarrito: Carrito[];
    private productosFilePath: string = 'resources/carrito.csv';

    private loadCarrito(): void {
        let archivo = fs.readFileSync(this.productosFilePath, 'utf8');
        let carrito = archivo.split('\n')
        const elementos = [];
        for (let i = 0; i < carrito.length; i++) {
            let linea = carrito[i].replace('\r', '');
            let p = linea.split(',');
            elementos.push(p);
        }
        this.listaDelCarrito = [];
        for (let i = 0; i < elementos.length; i++) {
            let carrito = new Carrito(elementos[i][0], elementos[i][1], elementos[i][2], parseInt(elementos[i][3]),
                parseInt(elementos[i][4]), elementos[i][5], elementos[i][6]);
            this.listaDelCarrito.push(carrito);
        }
    }

    public getCarrito(): Carrito[] {
        this.loadCarrito();
        return this.listaDelCarrito;
    }

    public create(car: any): string {

        const carrito = new Carrito(car._id, car.name, car.description, car.price, car.cant, car.cat, car.image);
        fs.appendFileSync('resources/carrito.csv',
            `\n${carrito.getId()},${carrito.getName()},${carrito.getDescrip()},${carrito.getPrice()},${carrito.getCant()},${carrito.getCat()},${carrito.getImage()}`);
        return "Producto agragado exitosamente al carrito";
    }


    public delete1deCarrito(index: number): boolean {
        let borrado = this.listaDelCarrito.splice(index, 1);[]
        this.actualizarArchivo();
        return borrado.length == 1;
    }

    public deleteAll() {
        let cantCarrito = this.listaDelCarrito.length;
        let borrado = this.listaDelCarrito.splice(0, cantCarrito);[]
        this.actualizarArchivo();
    }

    /* public updateCarrito(pos: number, car: any): boolean {
         const carrito = new Carrito(car._id,car.name,car.description,car.price,car.cant,car.cat,car.image);
         this.listaDelCarrito[pos] = carrito;
         this.actualizarArchivo();
         return true;
     }*/


    /*
   //TAREA
   private actualizarArchivo() {
       if (this.listaDelCarrito.length > 0) {
           fs.writeFileSync(this.productosFilePath,
               this.getProductoLine(this.listaDelCarrito[0])
           );
       } else {
           fs.writeFileSync(this.productosFilePath, '');
       }
       for (let i = 1; i < this.listaDelCarrito.length; i++) {
           fs.appendFileSync(this.productosFilePath,
               `\n${this.getProductoLine(this.listaDelCarrito[i])}`);
       }
   }

   private getProductoLine(carrito: Carrito): string {
       return `${carrito.getId()},${carrito.getName()},${carrito.getDescrip()},${carrito.getPrice()},${carrito.getCant()},${carrito.getCat()},${carrito.getImage()}`;
   }

   */

    //TYPEORM GET
    public async getAll(): Promise<Carrito[]> {
        console.log("Get All carritos");
        try {
            //Get all
            const result: Carrito[] = await this.carritoRepository.find();
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
            const carritoCreada: Carrito = await this.carritoRepository.save(
                new Carrito(
                    newCarrito.cantidad,
                    newCarrito.estado,
                    newCarrito.cliente_id_cliente,
                    newCarrito.producto_id_producto
                )
            );

            if (carritoCreada.getId()) {
                return carritoCreada;
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
                carrito.setCliente(newCarritoParams.cliente_id_cliente);
                carrito.setProducto(newCarritoParams.producto_id_producto);


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
