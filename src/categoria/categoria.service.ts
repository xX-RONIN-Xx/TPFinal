import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { CategoriaDTO } from './categoria.dto';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
    
    constructor(
        @InjectRepository(Categoria) 
        private readonly categoriaRepository: Repository<Categoria>
    ){}



    //TYPEORM GET
    public async getAll(): Promise<Categoria[]>{
        console.log("Get All categorias");
        try {
            //Get all
            const result: Categoria[] = await this.categoriaRepository.find();
            return result

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

    //TYPEORM GET by id
    public async getById(id: number): Promise<Categoria>{
        console.log("Getting categoria id: " + id);
        try {
            const categoria: Categoria = await this.categoriaRepository.findOne(id);
            if(categoria){
                return categoria;
            }else{
                throw new HttpException('No se pudo encontrar la categoria', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }

    //Add categoria
    public async addCategoria(newProducto: CategoriaDTO):Promise<Categoria>{
        try {
            const categoriaCreada: Categoria = await this.categoriaRepository.save(
                new Categoria(newProducto.nombre)
            );
            if(categoriaCreada.getId()){
                return categoriaCreada;
            }else{
                throw new HttpException('No se pudo crear la categoria', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }        
    }

    //#### Update categoria ####
    public async updateCategoria(newCategoriaParams: CategoriaDTO, id: number): Promise<Categoria>{
        try {
            let categoria: Categoria = await this.getById(id);

            if(categoria.getId()){
                categoria.setNombre(newCategoriaParams.nombre);

                const categoriaUpdated: Categoria = await this.categoriaRepository.save(categoria);

                if (categoriaUpdated) {
                    return categoriaUpdated;
                }else {
                    throw new HttpException('No se pudo crear la categoria', HttpStatus.NOT_MODIFIED);    
                }                
            }else{
                throw new HttpException('No se pudo crear la categoria', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }        
    }

    // #### Delete categoria ####
    public async deleteCategoria(id: number){        
        try {
            let categoria: Categoria = await this.getById(id);
            if (categoria.getId()) {
                let deleteResult = await this.categoriaRepository.delete(id);
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
