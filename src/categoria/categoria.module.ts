import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CategoriaController } from './categoria.controller';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Categoria
    ])
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
