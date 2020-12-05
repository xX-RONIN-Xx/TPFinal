import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Producto } from './producto';

@Injectable()
export class ProductoService {
    /*updateProducto(arg0: number, prod: any): boolean {
        throw new Error('Method not implemented.');
    }*/
    private listaProductos: Producto[];

    private loadProductos(): void {
        let archivo = fs.readFileSync('resources/productos.csv', 'utf8');
        const elementos = archivo.split('\n')
            .map(p => p.replace('\r', '')).map(p => p.split(','));
        this.listaProductos = [];
        for (let i = 0; i < elementos.length; i++) {
            let producto = new Producto(elementos[i][0], elementos[i][1], elementos[i][2],
                parseInt(elementos[i][3]), parseInt(elementos[i][4]), elementos[i][5], elementos[i][6]);
            this.listaProductos.push(producto);
        }
    }

    public getProductos(): Producto[] {
        this.loadProductos();
        //console.log(this.listaProductos);
        return this.listaProductos;
    }

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
     }*/
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

    }

}
