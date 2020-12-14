import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriaDTO } from './categoria.dto';
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

  /*  @Post("new-categoria")
    createArticle(@Body() categoriaDto: CategoriaDTO): Promise<Categoria> {
        return this.categoriaService.addCategoria(categoriaDto);
    }

    @Put(":id")
    public updateCategoria(@Body() categoriaDto: CategoriaDTO, @Param('id') id: number): Promise<Categoria>{
        return this.categoriaService.updateCategoria(categoriaDto,id);
    }

    @Delete(":id")
    public deleteCategoria(@Param('id') id: number){
        return this.categoriaService.deleteCategoria(id);
    }*/

}
