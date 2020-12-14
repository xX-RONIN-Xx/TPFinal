import { Factura } from 'src/factura/factura.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DETALLE_FACTURA')
export class DetalleFactura {

    @PrimaryGeneratedColumn()
    private id_detalle_factura: number;


    @Column()
    private cantdad: number;

    public getCantidad(): number {
        return this.cantdad;
    }

    public setCantidad(cantdad: number): void {
        this.cantdad = cantdad;
    }


    
    @OneToOne(type => Factura)
    @JoinColumn({ name: 'id_detalle_factura' })
    public carrito: Factura;



    
    public constructor(cantdad?: number) {
        this.cantdad = cantdad;
    }

    public getId(): number {
        return this.id_detalle_factura;
    }

    public setId(id_detalle_factura: number) {
        this.id_detalle_factura = id_detalle_factura;
    }

} 