import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './orders.entity';
import { CustomersModule } from '../customers/customers.module';
import { Customer } from '../customers/customers.entity';
import { OrderItem } from './order-item.entity';
import { Product } from '../products/products.entity';
import { ProductsModule } from '../products/products.module'; // ✅ Import ProductsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Customer, Product]),
    forwardRef(() => ProductsModule), // ✅ Ensure all entities are registered
    forwardRef(() => CustomersModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})

export class OrdersModule {}