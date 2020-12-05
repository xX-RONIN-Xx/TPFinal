import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { ProductoController } from './producto/producto.controller';
import { ProductoService } from './producto/producto.service';
import { CarritoController } from './carrito/carrito.controller';
import { CarritoService } from './carrito/carrito.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ClienteModule } from './cliente/cliente.module';
import { FacturaModule } from './factura/factura.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CarritoModule } from './carrito/carrito.module';
import { ProductoModule } from './producto/producto.module';
import { ImagenProductoModule } from './imagen-producto/imagen-producto.module';
import { PedidoPersonalizadoModule } from './pedido-personalizado/pedido-personalizado.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      }),
    ClienteModule,
    FacturaModule,
    DetalleFacturaModule,
    CategoriaModule,
    CarritoModule,
    ProductoModule,
    ImagenProductoModule,
    PedidoPersonalizadoModule,
  ],
  controllers: [AppController,CarritoController,ProductoController,LoginController],
  providers: [AppService,CarritoService,ProductoService,LoginService],
})
export class AppModule {}
