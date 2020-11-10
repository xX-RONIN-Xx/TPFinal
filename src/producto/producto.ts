export class Producto{
    private nombreProducto: string;
    private precio: number;
    
    constructor(nombre:string, precio:number){
        this.nombreProducto=nombre;
        this.precio=precio;
    }

    public getNombreProducto(): string {
        return this.nombreProducto;
    }
    public setNombreProducto(value: string) {
        this.nombreProducto = value;
    }

    public getPrecio(): number {
        return this.precio;
    }
    public setPrecio(value: number) {
        this.precio = value;
    }

}