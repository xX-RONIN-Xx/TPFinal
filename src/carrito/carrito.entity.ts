import { Cliente } from 'src/cliente/cliente.entity';
import { Producto } from 'src/producto/producto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CARRITO')
export class Carrito {

    @PrimaryGeneratedColumn()
    private id_carrito: number;


    @Column()
    private cantidad: number;

    public getCantidad(): number {
        return this.cantidad;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    @Column()
    private cliente_id_cliente: number;

    public getCliente():number{
        return this.cliente_id_cliente;
    }

    public setCliente(cliente_id_cliente:number):void{
        this.cliente_id_cliente=cliente_id_cliente;
    }

    @Column()
    private producto_id_producto:number;

    public getProd():number{
        return this.producto_id_producto;
    }

    public setProd(producto_id_producto:number):void{
        this.producto_id_producto=producto_id_producto;
    }

    

    @Column()
    private estado: string;

    public getEstado(): string {
        return this.estado;
    }

    public setEstado(estado: string): void {
        this.estado = estado;
    }


    @OneToOne(type => Cliente)
    @JoinColumn({ name: 'cliente_id_cliente' })
    public cliente: Cliente;

   /* @OneToOne((type) => Cliente, cliente => cliente.carrito)
    public cliente: Cliente[];*/


    @ManyToOne(()=>Producto, producto=> producto.carritos)
    @JoinColumn({name: 'producto_id_producto'})
    public producto: Producto;

    
    public constructor(cantidad?: number, cliente_id_cliente?: number, producto_id_producto?:number, estado?: string) {
        this.cantidad = cantidad;
        this.cliente_id_cliente= cliente_id_cliente;
        this.producto_id_producto=producto_id_producto;
        this.estado = estado;
    }

    public getId(): number {
        return this.id_carrito;
    }

    public setId(id_carrito: number) {
        this.id_carrito = id_carrito;
    }

} 