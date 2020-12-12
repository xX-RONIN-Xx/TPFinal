import { Cliente } from 'src/cliente/cliente.entity';
import { DetalleFactura } from 'src/detalle-factura/detalle-factura.entity';
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

    /*@OneToOne(type => DetalleFactura)
    @JoinColumn({ name: 'id_factura' })
    public detalleFactura: DetalleFactura;*/
    

    public constructor(fecha?: string, ) {
        this.fecha = fecha;
        //this.id_cliente = id_cliente;
    }

    public getId(): number {
        return this.id_factura;
    }

    public setId(id_factura: number) {
        this.id_factura = id_factura;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }

   /* public getDetalleFactura(): DetalleFactura {
        return this.detalleFactura;
    }

    public setDetalleFactura(detalleFactura: DetalleFactura): void {
        this.detalleFactura = detalleFactura;
    }
*/
} 