import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagenProductoDTO } from './imagen-producto.dto';
import { ImagenProducto } from './imagen.producto.entity';

@Injectable()
export class ImagenProductoService {

    constructor(
        @InjectRepository(ImagenProducto) 
        private readonly productoRepository: Repository<ImagenProducto>
    ){}

    //TYPEORM GET
    public async getAll(): Promise<ImagenProducto[]>{
        console.log("Get All productos");
        try {
            //Get all
            const result: ImagenProducto[] = await this.productoRepository.find();
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
            const producto: ImagenProducto = await this.productoRepository.findOne(id);
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

    //Add producto
    public async addImagen(newProducto: ImagenProductoDTO):Promise<ImagenProducto>{
        try {
            const productoCreada: ImagenProducto = await this.productoRepository.save(
                new ImagenProducto(
                    newProducto.direccion,
                    newProducto.producto_id_producto

                    )
            );

            if(productoCreada.getId()){
                return productoCreada;
            }else{
                throw new HttpException('No se pudo crear el producto', HttpStatus.NOT_FOUND);
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
                producto.setProducto(newProductoParams.producto_id_producto);
                

                const productoUpdated: ImagenProducto = await this.productoRepository.save(producto);

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
                let deleteResult = await this.productoRepository.delete(id);
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
