import { Producto } from 'src/producto/producto.entity';
import { ProductoService } from 'src/producto/producto.service';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CATEGORIA')
export class Categoria {

    @PrimaryGeneratedColumn()
    private id_categoria: number;

     @OneToMany(()=>Producto, producto => producto.categoria)
     public productos: Producto[];

    @Column()
    private nombre: string;
    producto: any;

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public constructor(nombre?: string) {
        this.nombre = nombre;
    }

    public getId(): number {
        return this.id_categoria;
    }

    public setId(id_categoria: number) {
        this.id_categoria = id_categoria;
    }

} 