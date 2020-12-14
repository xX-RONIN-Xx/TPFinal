import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { ImagenProducto } from 'src/imagen-producto/imagen.producto.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { Repository } from 'typeorm';
import { ProductoDTO } from './producto.dto';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(Producto) 
        private readonly productoRepository: Repository<Producto>,
        //@InjectRepository(ImagenProducto)
        //private readonly imagenProductoRepository: Repository<ImagenProducto>
    ){}

    //TYPEORM GET
    public async getAll(): Promise<Producto[]>{
        console.log("Get All productos");
        try {
            //Get all
            const result: Producto[] = await this.productoRepository.find({
                relations: ["categoria", "imagen_producto"]
            });
            
            return result

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

    
    //TYPEORM GET by id
    public async getById(id: number): Promise<Producto>{
        console.log("Getting producto id: " + id);
        try {
<<<<<<< HEAD
            const producto: Producto = await this.productoRepository.findOne(id, {
                relations: ["categoria", "imagen_producto"]
            });
            if(producto){
=======
            const producto: Producto = await this.productoRepository.findOne(id);
            if(producto.getId){
>>>>>>> cf0099b4cda876a9cd1fe582d8ae55b9e68e885d
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
    public async addProduct(newProducto: ProductoDTO):Promise<Producto>{
        try {
            const productoCreado: Producto = await this.productoRepository.save(
                new Producto(
                    newProducto.nombre,
                    newProducto.descripcion,
                    newProducto.precio,
                    newProducto.stock,
                    newProducto.categoria_id_categoria,
                    newProducto.pedido_personalizado_id_pedido

                    )
            );

            if(productoCreado.getId()){
                return productoCreado;
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
    public async updateProducto(newProductoParams: ProductoDTO, id: number): Promise<Producto>{
        try {
            let producto: Producto = await this.getById(id);

            if(producto.getId()){
                producto.setNombre(newProductoParams.nombre);
                producto.setDescripcion(newProductoParams.descripcion);
                producto.setPrecio(newProductoParams.precio);
                producto.setStock(newProductoParams.stock);
                

                const productoUpdated: Producto = await this.productoRepository.save(producto);

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
    public async deleteProducto(id: number){        
        console.log('entro al borrar del service')
        try {
            let producto: Producto = await this.getById(id);
            console.log(producto);
            if (producto.getId()) {
                let deleteResult = await this.productoRepository.delete(id);
                if (deleteResult.affected) {

                    console.log('Se borro correctamente')
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
