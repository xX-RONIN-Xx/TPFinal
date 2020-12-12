
import { Factura } from 'src/factura/factura.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DETALLE_FACTURA')
export class DetalleFactura {

    @PrimaryGeneratedColumn()
    private id_detalle_factura: number;

    @Column()
    private lala: number;

    public getCantidad(): number {
        return this.lala;
    }

    public setCantidad(lala: number): void {
        this.lala = lala;
    }


    /*@OneToOne(type => Factura)
    @JoinColumn({ name: 'id_factura' })
    public factura: Factura;*/
    
    public constructor(lala?: number, id_factura?: number) {
        this.lala = lala;
    }

    public getId(): number {
        return this.id_detalle_factura;
    }

    public setId(id_detalle_factura: number) {
        this.id_detalle_factura = id_detalle_factura;
    }

} 