import { Cliente } from 'src/cliente/cliente.entity';
import { DetalleFactura } from 'src/detalle-factura/detalle-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FACTURA')
export class Factura {

    @PrimaryGeneratedColumn()
    private id_factura: number;


    @Column()
    private fecha: string;

    public getFecha(): string {
        return this.fecha;
    }

    public setFecha(fecha: string): void {
        this.fecha = fecha;
    }

    @ManyToOne(type => Cliente, cliente => cliente.facturas)
    @JoinColumn({ name: 'id_factura' })
    public cliente: Cliente; 


    

    public constructor(fecha?: string) {
        this.fecha = fecha;
    }

    public getId(): number {
        return this.id_factura;
    }

    public setId(id_factura: number) {
        this.id_factura = id_factura;
    }

} 