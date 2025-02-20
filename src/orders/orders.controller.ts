import { Controller, Post, Body, NotFoundException, UseGuards, Query, Get} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CustomersService } from '../customers/customers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly customersService: CustomersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: { customerId: number; products: { productId: number; quantity: number }[] }) {
    if (!body.products || body.products.length === 0) {
      throw new NotFoundException('Order must include at least one product');
    }

    return this.ordersService.create(body.customerId, body.products);
  }

  @UseGuards(JwtAuthGuard)
  @Get('topOrder')
  async getMostOrderingCustomer(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ) {
    return this.ordersService.getMostOrderingCustomer(startDate, endDate);
  }

  @UseGuards(JwtAuthGuard)
  @Get('topProduct')
  async getTopOrderedProducts() {
    return this.ordersService.getTopOrderedProducts();
  }
}
