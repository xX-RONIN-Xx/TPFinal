import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from 'src/categoria/categoria.entity';
import { ImagenProducto } from 'src/imagen-producto/imagen.producto.entity';

@Entity('producto')
export class Producto {

    @PrimaryGeneratedColumn()
    private id_producto: number;

    @Column()
    private nombre: string;
    imagenes: any;

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    @Column()
    private descripcion: string;

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    @Column()
    private precio: number;

    public getPrecio(): number {
        return this.precio;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    @Column()
    private stock: number;

    public getStock(): number {
        return this.stock;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

    @Column()
    private categoria_id_categoria: number;

    @ManyToOne(()=>Categoria, categoria => categoria.productos)
    @JoinColumn({name: 'categoria_id_categoria'})
    public categoria: Categoria;

    @OneToOne((type) => ImagenProducto, imagen_producto => imagen_producto.producto)
    public imagen_producto: ImagenProducto[];


    public getCategoria(): number {
        return this.categoria_id_categoria;
    }

    public setCategoria(categoria_id_categoria:number): void {
        this.categoria_id_categoria = categoria_id_categoria;
    }

    @Column()
    private pedido_personalizado_id_pedido: number;

    public getPedido(): number {
        return this.pedido_personalizado_id_pedido;
    }

    public setPedido(pedido_personalizado_id_pedido: number): void {
        this.pedido_personalizado_id_pedido = pedido_personalizado_id_pedido;
    }

    public constructor(nombre?: string, descripcion?: string, precio?: number, stock?:number, categoria_id_categoria?: number, pedido_personalizado_id_pedido?: number) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.categoria_id_categoria = categoria_id_categoria;
        this.pedido_personalizado_id_pedido = pedido_personalizado_id_pedido;
    }

    public getId(): number {
        return this.id_producto;
    }

    public setId(id_producto: number) {
        this.id_producto = id_producto;
    }

} 