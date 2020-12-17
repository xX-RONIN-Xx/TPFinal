import { Cliente } from 'src/cliente/cliente.entity';
import { Producto } from 'src/producto/producto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { threadId } from 'worker_threads';

@Entity('PEDIDO_PERSONALIZADO')
export class PedidoPersonalizado {

    @PrimaryGeneratedColumn()
    private id_pedido: number;

    @Column()
    private dimesion_x: number;
    producto: any;
    cliente: any;

    public getX(): number {
        return this.dimesion_x;
    }

    public setX(dimesion_x: number): void {
        this.dimesion_x = dimesion_x;
    }

    @Column()
    private dimension_y: number;

    public getY(): number {
        return this.dimension_y;
    }

    public setY(dimension_y: number): void {
        this.dimension_y = dimension_y;
    }

    @Column()
    private dimension_z: number;

    public getZ(): number {
        return this.dimension_z;
    }

    public setZ(dimension_z: number): void {
        this.dimension_z = dimension_z;
    }

    @Column()
    private colores: string;

    @Column()
    private tipo_filamento: string;

    @Column()
    private altura_capa: number;

    @Column()
    private temperatura: number;

    @Column()
    private relleno: number;

    @Column()
    private comentarios: string;

    @Column()
    private cliente_id_cliente: number;

    @ManyToOne(()=>Cliente, cliente => cliente.pedido_personalizado)
    @JoinColumn({name: 'cliente_id_cliente'})
    public pedido_personalzado: Cliente;

    

    
    public constructor(dimesion_x?: number, dimension_y?: number, dimension_z?: number, colores?: string, tipo_filamento?: string,
        altura_capa?: number,temperatura?: number, relleno?: number,comentarios?: string, cliente_id_cliente?: number) {
        this.dimesion_x = dimesion_x;
        this.dimension_y = dimension_y;
        this.dimension_z = dimension_z;
        this.colores = colores;
        this.tipo_filamento = tipo_filamento;
        this.altura_capa = altura_capa;
        this.temperatura = temperatura;
        this.relleno = relleno;
        this.comentarios=comentarios;
        this.cliente_id_cliente=cliente_id_cliente;
        
    }

    public getId(): number {
        return this.id_pedido;
    }

    public setId(id_pedido: number) {
        this.id_pedido = id_pedido;
    }

    public setColores(colores: string) {
        this.colores = colores;
    }

    public getColores(): string {
        return this.colores;
    }

    public getFilamento(): string {
        return this.tipo_filamento;
    }

    public setFilamento(tipo_filamento: string) {
        this.tipo_filamento = tipo_filamento;
    }

    public getAlt(): number {
        return this.altura_capa;
    }

    public setAlt(altura_capa: number) {
        this.altura_capa = altura_capa;
    }

    public getTemp(): number {
        return this.temperatura;
    }

    public setTemp(temperatura: number) {
        this.temperatura = temperatura;
    }

    public getRelleno(): number {
        return this.relleno;
    }

    public setRelleno(relleno: number) {
        this.relleno = relleno;
    }

    public getComent(): string {
        return this.comentarios;
    }

    public setComment(comentarios: string) {
        this.comentarios = comentarios;
    }

    public getCliente(): number {
        return this.cliente_id_cliente;
    }

    public setCliente(cliente_id_cliente: number) {
        this.cliente_id_cliente = cliente_id_cliente;
    }

    @OneToOne((type) => PedidoPersonalizado, pedido_personalizado => pedido_personalizado.producto)
    public pedido_personalizado: PedidoPersonalizado[];


} 