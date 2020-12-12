import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleFacturaController } from './detalle-factura.controller';
import { DetalleFactura } from './detalle-factura.entity';
import { DetalleFacturaService } from './detalle-factura.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DetalleFactura
    ])
  ],
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService]
})
export class DetalleFacturaModule {}
