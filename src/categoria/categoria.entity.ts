import { Producto } from 'src/producto/producto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CATEGORIA')
export class Categoria {

    @PrimaryGeneratedColumn()
    private id_categoria: number;

    @Column()
    private nombre: string;

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    @OneToMany((type) => Producto, producto => producto.categoria)
    public productos: Producto[];


    
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