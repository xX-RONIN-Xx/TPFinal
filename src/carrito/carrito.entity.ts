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


    @OneToOne(type => Cliente)
    @JoinColumn({ name: 'cliente_id_cliente' })
    public cliente: Cliente;


    @ManyToOne(type => Producto, producto => producto.carritos)
    @JoinColumn({ name: 'id_carrito' })
    public producto: Producto; 
    
    public constructor(cantidad?: string, estado?: string, cliente?: Cliente) {
        this.cantidad = cantidad;
        this.estado = estado;
        this.cliente = cliente;
    }

    public getId(): number {
        return this.id_carrito;
    }

    public setId(id_carrito: number) {
        this.id_carrito = id_carrito;
    }

    
    public getCliente(): Cliente {
        return this.cliente;
    }

    public setCliente(cliente: Cliente) {
        this.cliente = cliente;
    }
} 