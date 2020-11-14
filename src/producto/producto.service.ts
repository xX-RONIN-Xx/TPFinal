import { Injectable } from '@nestjs/common';
//import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
//import { Prod } from './entities/productos.entity';
import { Producto } from './Producto';



@Injectable()
export class ProductoService {

    private listaProductos: Producto[];
    private productosFilePath: string = 'resources/productos.csv';

  /*  constructor(
        @InjectRepository(Prod)
        private readonly prodRepository: Repository<Prod>
    ){ }*/

    private loadProductos(): void {
        
        let archivo = fs.readFileSync(this.productosFilePath, 'utf8');
        const elementos = archivo.split('\n')
            .map(p => p.replace('\r', '')).map(p => p.split(','));
        this.listaProductos = [];
        for (let i = 0; i < elementos.length; i++) {
            let producto = new Producto(elementos[i][0],
                parseInt(elementos[i][1]));
            this.listaProductos.push(producto);
        }
    }

    public getProductos(): Producto[] {
        this.loadProductos();
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
        const producto = new Producto(prod.nombreProducto, prod.precio);

        if (producto.getNombreProducto() && producto.getPrecio()) {
            fs.appendFileSync(this.productosFilePath,
            `\n${producto.getNombreProducto()},${producto.getPrecio()}`);

            return "ok";
        } else {
            return "parametros incorrectos";
        }
    }

    public deleteProducto(index: number): boolean {
        let borrado = this.listaProductos.splice(index,1); []
        this.actualizarArchivo();
        return borrado.length == 1;
    }

    public updateProducto(pos: number, prod: any): boolean {
        const producto = new Producto(prod.nombreProducto, prod.precio);
        this.listaProductos[pos] = producto;
        this.actualizarArchivo();
        return true;
    }
    
    //TAREA
    private actualizarArchivo(){
        if(this.listaProductos.length > 0 ){
            fs.writeFileSync(this.productosFilePath, 
                this.getProductoLine(this.listaProductos[0])
            );
        }else{
            fs.writeFileSync(this.productosFilePath, '');
        }
        for (let i=1; i<this.listaProductos.length; i++){
            fs.appendFileSync(this.productosFilePath,
                `\n${this.getProductoLine(this.listaProductos[i])}`);
        }
    }

    private getProductoLine(producto: Producto): string{
        return `${producto.getNombreProducto()},${producto.getPrecio()}`;
    }
}