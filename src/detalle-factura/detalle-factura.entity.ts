
import { Cliente } from 'src/cliente/cliente.entity';
import { Factura } from 'src/factura/factura.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DETALLE_FACTURA')
export class DetalleFactura {

    @PrimaryGeneratedColumn()
    private id_detalle_factura: number;

    @Column()
    private cantidad: number;

    public getCantidad(): number {
        return this.cantidad;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    @Column()
    private total: number;

    public getTotal(): number {
        return this.total;
    }

    public setTotal(total: number): void {
        this.total = total;
    }

    @Column()
    private producto_id_producto: number;

    public getProducto(): number {
        return this.producto_id_producto;
    }

    public setProducto(producto: number): void {
        this.producto_id_producto = producto;
    }

    @Column()
    private factura_id_factura: number;

    public getFactura(): number {
        return this.factura_id_factura;
    }

    public setFactura(factura: number): void {
        this.factura_id_factura = factura;
    }


    @OneToOne(type => Factura)
    @JoinColumn({ name: 'id_detalle_factura' })
    public factura: Factura;

    

    public constructor(cantidad?: number, total?: number, producto_id_producto?: number, factura_id_factura?: number) {
        this.cantidad = cantidad;
        this.total = total;
        this.producto_id_producto = producto_id_producto;
        this.factura_id_factura = factura_id_factura;
    }

    public getId(): number {
        return this.id_detalle_factura;
    }

    public setId(id_detalle_factura: number) {
        this.id_detalle_factura = id_detalle_factura;
    }

} 