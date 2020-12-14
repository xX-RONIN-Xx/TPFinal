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
    @JoinColumn({ name: 'id_factura'})
    public cliente: Cliente; 

    @OneToOne(type => DetalleFactura)
    @JoinColumn({ name: 'id_factura' })
    public detalleFactura: DetalleFactura;
    

    @Column()
    private cliente_id_cliente: number;


    public constructor(fecha?: string, cliente_id_cliente?: number) {
        this.fecha = fecha;
        this.cliente_id_cliente = cliente_id_cliente;
    }

    public getId(): number {
        return this.id_factura;
    }

    public setId(id_factura: number) {
        this.id_factura = id_factura;
    }

    public getCliente(): number {
        return this.cliente_id_cliente;
    }

    public setCliente(cliente: number): void {
        this.cliente_id_cliente = cliente;
    }

   /* public getDetalleFactura(): DetalleFactura {
        return this.detalleFactura;
    }

    public setDetalleFactura(detalleFactura: DetalleFactura): void {
        this.detalleFactura = detalleFactura;
    }
*/
} 