import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';


@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(Producto) 
        private readonly productoRepository: Repository<Producto>
    ){}

    updateProducto(arg0: number, prod: any): boolean {
        throw new Error('Method not implemented.');
    }
    private listaProductos: Producto[];




/*
    public getProducto(index: any): Producto {
        this.loadProductos();
        let array = this.listaProductos;
        for (let i = 0; i < array.length; i++) {
            if (array[i].getID() == index) {
                return array[i];
            }
        }
    }

    public create(prod: any): string {

        const producto = new Producto(prod._id, prod.name, prod.description, prod.price, prod.stock, prod.category, prod.image);

        if (producto.getID() && producto.getname() && producto.getDescription() && producto.getPrice() && producto.getStock() && producto.getCategory() && producto.getImage()) {
            fs.appendFileSync('resources/productos.csv',
                `\n${producto.getID()},${producto.getname()},${producto.getDescription()},${producto.getPrice()},${producto.getStock()},${producto.getCategory()},${producto.getImage()}`);

            return "ok";
        } else {
            return "parametros incorrectos";
        }
    }

    public deleteProducto(position: number): boolean {

        let removed = this.listaProductos.splice(position, 1);
        let archivos = this.listaProductos;
        let archivo = "";
        for (let index = 0; index < archivos.length; index++) {
            archivo += (`${archivos[index].getID()},${archivos[index].getname()},${archivos[index].getDescription()},${archivos[index].getStock()},${archivos[index].getPrice()},${archivos[index].getCategory()},${archivos[index].getImage()}\n`);
        }
        let cadena = archivo.substr(0, archivo.length - 1)
        fs.writeFileSync('resources/productos.csv', cadena);
        return removed.length == 1;
    }

    /* public updateProduct(@Param('id') id: string, @Body() prod: any): boolean {
         const producto = new Producto(prod._id, prod.name, prod.description, prod.price, prod.stock, prod.category, prod.image);
         let archivos = this.listaProductos;
 
         for (let i = 0; i < archivos.length; i++) {
             if (archivos[i].getID() == prod._id) {
                 console.log(archivos[i])
                 archivos[i] == prod;
             } fs.writeFileSync('resources/productos.csv', archivos[i]);
         }
         return true;
     }
    public updateProducto(prod: any, position: string): boolean {
        const producto = new Producto(position, prod.name, prod.description, prod.price, prod.stock, prod.category, prod.image);
        let archivos = this.listaProductos;
        let STRarchivo = "";
        for (let i = 0; i < archivos.length; i++) {
            if (archivos[i].getID() == prod._id) {
                archivos[i] = producto;
            }
        }
        for (let index = 0; index < archivos.length; index++) {
            STRarchivo += (`${archivos[index].getID()},${archivos[index].getname()},${archivos[index].getDescription()},${archivos[index].getPrice()},${archivos[index].getStock()},${archivos[index].getCategory()},${archivos[index].getImage()}\n`);
        }
        let cadena = STRarchivo.substr(0, STRarchivo.length - 1)
        fs.writeFileSync('resources/productos.csv', cadena);
        return true;

    }*/


    public async getAll(): Promise<Producto[]>{
        console.log("Get All productos");
        try {
            //Get all
            const result: Producto[] = await this.productoRepository.find();
            return result

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

}
