import { Controller, Get, Param } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {
    public constructor(private readonly categoriaService: CategoriaService) { }

    @Get("get-all")
    public getAllCategorias(): Promise<Categoria[]>{
        return this.categoriaService.getAll();
    }

    @Get(":id")
    public getById(@Param('id') id: number): Promise<Categoria>{
        return this.categoriaService.getById(id);
    }

}
