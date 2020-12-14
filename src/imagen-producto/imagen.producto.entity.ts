import { Producto } from 'src/producto/producto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('IMAGEN_PRODUCTO')
export class ImagenProducto {

    @PrimaryGeneratedColumn()
    private id_imagen: number;

    @Column()
    private direccion: string;

    public getDireccion(): string {
        return this.direccion;
    }

    public setDireccion(direccion: string): void {
        this.direccion = direccion;
    }

    @Column()
    private producto_id_producto: number;

    public getProducto(): number {
        return this.producto_id_producto;
    }

    public setProducto(producto_id_producto: number): void {
        this.producto_id_producto = producto_id_producto;
    }


    @ManyToOne(type => Producto, producto => producto.imagenes)
    @JoinColumn({ name: 'id_imagen' })
    public producto: Producto; 

    
    public constructor(direccion?: string, producto_id_producto?: number) {
        this.direccion = direccion;
        this.producto_id_producto = producto_id_producto;
    }

    public getId(): number {
        return this.id_imagen;
    }

    public setId(id_imagen: number) {
        this.id_imagen = id_imagen;
    }

} 