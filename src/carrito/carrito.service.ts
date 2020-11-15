import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Carrito } from './carrito';



@Injectable()
export class CarritoService {
   
    private listaDelCarrito: Carrito [];
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
            let carrito = new Carrito (elementos[i][0],elementos[i][1],elementos[i][2],parseInt(elementos[i][3]),
                parseInt(elementos[i][4]),elementos[i][5],elementos[i][6]);
            this.listaDelCarrito.push(carrito);
        }
    }

    public getCarrito(): Carrito[] {
        this.loadCarrito();
        return this.listaDelCarrito;
    }

    public create(car: any): string {
        console.log(car);
        const carrito = new Carrito(car._id,car.name,car.description,car.price,car.cant,car.cat,car.image);

        if (carrito.getId() && carrito.getName() && carrito.getDescrip() && carrito.getPrice() && carrito.getCant() && carrito.getCat() && carrito.getImage()) {
            fs.appendFileSync('resources/carrito.csv',
            `\n${carrito.getId()},${carrito.getName()},${carrito.getDescrip()},${carrito.getPrice()},${carrito.getCant()},${carrito.getCat()},${carrito.getImage()}`);

            return "ok";
        } else {
            return "parametros incorrectos";
        }
    }

    public delete1deCarrito(index: number): boolean {
        let borrado = this.listaDelCarrito.splice(index,1); []
        this.actualizarArchivo();
        return borrado.length == 1;
    }

    public deleteAll(index: number): boolean {
        let borrado = this.listaDelCarrito.splice(index); []
        //this.actualizarArchivo();
        return borrado.length==1;
    }

    public updateCarrito(pos: number, car: any): boolean {
        const carrito = new Carrito(car._id,car.name,car.description,car.price,car.cant,car.cat,car.image);
        this.listaDelCarrito[pos] = carrito;
        this.actualizarArchivo();
        return true;
    }
    
    //TAREA
    private actualizarArchivo(){
        if(this.listaDelCarrito.length > 0 ){
            fs.writeFileSync(this.productosFilePath, 
                this.getProductoLine(this.listaDelCarrito[0])
            );
        }else{
            fs.writeFileSync(this.productosFilePath, '');
        }
       for (let i=1; i<this.listaDelCarrito.length; i++){
            fs.appendFileSync(this.productosFilePath,
                `\n${this.getProductoLine(this.listaDelCarrito[i])}`);
        }
    }

    private getProductoLine(carrito: Carrito): string{
        return `${carrito.getId()},${carrito.getName()},${carrito.getDescrip()},${carrito.getPrice()},${carrito.getCant()},${carrito.getCat()},${carrito.getImage()}`;
    }
}
