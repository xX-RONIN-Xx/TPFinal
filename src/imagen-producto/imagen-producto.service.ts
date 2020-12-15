import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagenProductoDTO } from './imagen-producto.dto';
import { ImagenProducto } from './imagen.producto.entity';

@Injectable()
export class ImagenProductoService {

    constructor(
        @InjectRepository(ImagenProducto) 
        private readonly imagenProductoRepository: Repository<ImagenProducto>
    ){}

    //TYPEORM GET
    public async getAll(): Promise<ImagenProducto[]>{
        console.log("Get All productos");
        try {
            //Get all
            const result: ImagenProducto[] = await this.imagenProductoRepository.find();
            return result

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

    //TYPEORM GET by id
    public async getById(id: number): Promise<ImagenProducto>{
        console.log("Getting producto id: " + id);
        try {
            const producto: ImagenProducto = await this.imagenProductoRepository.findOne(id);
            if(producto){
                return producto;
            }else{
                throw new HttpException('No se pudo encontrar el producto', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

    //Add Imagen
    public async addImagen(newImagen: ImagenProductoDTO):Promise<ImagenProducto>{
        try {
            const imagenCreada: ImagenProducto = await this.imagenProductoRepository.save(
                new ImagenProducto(
                    newImagen.direccion,
                    newImagen.producto_id_producto

                    )
            );

            if(imagenCreada.getId()){
                return imagenCreada;
            }else{
                throw new HttpException('No se pudo crear la imagen', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }        
    }

    //#### Update producto ####
    public async updateImagen(newProductoParams: ImagenProductoDTO, id: number): Promise<ImagenProducto>{
        try {
            let producto: ImagenProducto = await this.getById(id);

            if(producto.getId()){
                producto.setDireccion(newProductoParams.direccion);

                

                const productoUpdated: ImagenProducto = await this.imagenProductoRepository.save(producto);

                if (productoUpdated) {
                    return productoUpdated;
                }else {
                    throw new HttpException('No se pudo crear el producto', HttpStatus.NOT_MODIFIED);    
                }                
            }else{
                throw new HttpException('No se pudo crear el producto', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }        
    }

    // #### Delete producto ####
    public async deleteImagen(id: number){        
        try {
            let imagenProducto: ImagenProducto = await this.getById(id);
            if (imagenProducto.getId()) {
                let deleteResult = await this.imagenProductoRepository.delete(id);
                if (deleteResult.affected) {


                }
                return deleteResult;
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }
}
