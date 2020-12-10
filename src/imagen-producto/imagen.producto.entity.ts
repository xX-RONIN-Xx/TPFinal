import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    
    public constructor(direccion?: string) {
        this.direccion = direccion;
    }

    public getId(): number {
        return this.id_imagen;
    }

    public setId(id_imagen: number) {
        this.id_imagen = id_imagen;
    }

} 