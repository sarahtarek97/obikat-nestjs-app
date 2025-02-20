import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './customers.entity';
import { OrdersModule } from '../orders/orders.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    forwardRef(() => OrdersModule),
  ],  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
