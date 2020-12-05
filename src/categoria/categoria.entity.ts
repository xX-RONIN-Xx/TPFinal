import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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