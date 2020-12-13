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

    

  

}
