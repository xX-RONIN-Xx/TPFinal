import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
<<<<<<< HEAD
import { ProductoController } from './producto/producto.controller';
import { ProductoService } from './producto/producto.service';
import { CarritoController } from './carrito/carrito.controller';
import { CarritoService } from './carrito/carrito.service';
=======
>>>>>>> bb39eb5... Preparacion de archivos finalizada, empezar a codear a partir de aca.

@Module({
  imports: [
    ServeStaticModule.forRoot({
<<<<<<< HEAD
      rootPath: join(__dirname, '..', 'client'),
      }),
  ],
  controllers: [AppController,CarritoController,ProductoController],
  providers: [AppService,CarritoService,ProductoService],
=======
      rootPath: join(__dirname, '..',
      'client'),
      }),    
  ],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> bb39eb5... Preparacion de archivos finalizada, empezar a codear a partir de aca.
})
export class AppModule {}
