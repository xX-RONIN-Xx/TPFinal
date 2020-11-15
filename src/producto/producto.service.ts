import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Producto } from './Producto';



@Injectable()
export class ProductoService {
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

    public getProducto(index: number): Producto {
        this.loadProductos();
        console.log(this.listaProductos);
        // Más adelante agregar manejo de status code
        if (index < 0 || index >= this.listaProductos.length)
            return null;
        return this.listaProductos[index];
    }

    public create(prod: any): string {
        console.log(prod);
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

        console.log(this.listaProductos.length)
        let removed = this.listaProductos.splice(position,1);
        let archivos=this.listaProductos;
       console.log(this.listaProductos.length)
        let archivo="";
        for (let index = 0; index < this.listaProductos.length-1; index++) {
            archivo+= (`${archivos[index].getID()},${archivos[index].getname()},${archivos[index].getDescription()},${archivos[index].getStock()},${archivos[index].getPrice()},${archivos[index].getCategory()},${archivos[index].getImage()}\n`);
        }
    let cadena=archivo.substr(0,archivo.length-1)
        fs.writeFileSync('resources/productos.csv', cadena);
        return removed.length == 1;
        }


}
