import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {ProductoController} from './producto/producto.controller';
import {ProductoService} from './producto/producto.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..',
      'client'),
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
