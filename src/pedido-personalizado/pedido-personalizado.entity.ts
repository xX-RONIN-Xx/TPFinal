import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('PEDIDO_PERSONALIZADO')
export class PedidoPersonalizado {

    @PrimaryGeneratedColumn()
    private id_pedido_personalizado: number;


    @Column()
    private fecha: string;

    public getFecha(): string {
        return this.fecha;
    }

    public setFecha(fecha: string): void {
        this.fecha = fecha;
    }


   /* @OneToOne(type => DetalleFactura)
    @JoinColumn({ name: 'id_detalle_factura' })
    public detalleFactura: DetalleFactura;*/
    

    public constructor(fecha?: string, id_cliente?: number) {
        this.fecha = fecha;
        //this.id_cliente = id_cliente;
    }

    public getId(): number {
        return this.id_pedido_personalizado;
    }

    public setId(id_pedido_personalizado: number) {
        this.id_pedido_personalizado = id_pedido_personalizado;
    }


   /* public getDetalleFactura(): DetalleFactura {
        return this.detalleFactura;
    }

    public setDetalleFactura(detalleFactura: DetalleFactura): void {
        this.detalleFactura = detalleFactura;
    }
*/
} 