import { Cliente } from 'src/cliente/cliente.entity';
import { Producto } from 'src/producto/producto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CARRITO')
export class Carrito {

    @PrimaryGeneratedColumn()
    private id_carrito: number;


    @Column()
    private cantidad: string;

    public getCantidad(): string {
        return this.cantidad;
    }

    public setCantidad(cantidad: string): void {
        this.cantidad = cantidad;
    }

    @Column()
    private estado: string;

    public getEstado(): string {
        return this.estado;
    }

    public setEstado(estado: string): void {
        this.estado = estado;
    }


    /*@OneToOne(type => Cliente)
    @JoinColumn({ name: 'id_cliente' })
    public cliente: Cliente;*/

    @OneToOne((type) => Cliente, cliente => cliente.carrito)
    public cliente: Cliente[];


    @ManyToOne(()=>Producto, producto=> producto.carritos)
    @JoinColumn({name: 'producto_id_producto'})
    public producto: Producto;

    
    public constructor(cantidad?: string, estado?: string) {
        this.cantidad = cantidad;
        this.estado = estado;
    }

    public getId(): number {
        return this.id_carrito;
    }

    public setId(id_carrito: number) {
        this.id_carrito = id_carrito;
    }

} 