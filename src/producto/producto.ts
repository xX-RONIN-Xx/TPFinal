export class Producto{
    private marca: string;
    private patente: string;
    private año: number;
    private precio: number;
    private tipo:string;
    
    constructor(marca:string, patente:string, año:number, precio:number, tipo:string){
        this.marca=marca;
        this.patente=patente;
        this.año=año;
        this.precio=precio;
        this.tipo=tipo;
    }

    public getMarca(): string {
        return this.marca;
    }
    public setMarca(value: string) {
        this.marca = value;
    }
    public getPatente(): string {
        return this.patente;
    }
    public setPatente(value: string) {
        this.patente = value;
    }
    public getAño(): number{
        return this.año;
    }
    public setAño(value: number) {
        this.año = value;
    }

    public getPrecio(): number {
        return this.precio;
    }
    public setPrecio(value: number) {
        this.precio = value;
    }
    public getTipo(): string {
        return this.tipo;
    }
    public setTipo(value: string) {
        this.tipo = value;
    }

}