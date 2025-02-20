import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { OrdersModule } from '../orders/orders.module'; // ✅ Import OrdersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => OrdersModule), // ✅ Use forwardRef to break circular dependency
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
