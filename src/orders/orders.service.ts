import { Injectable, NotFoundException, Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./orders.entity";
import { OrderItem } from "./order-item.entity";
import { Customer } from "../customers/customers.entity";
import { Product } from "../products/products.entity";
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderItem) private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Customer) private customersRepository: Repository<Customer>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @Inject(forwardRef(() => ProductsService)) private productsService: ProductsService,
  ) {}

  async create(
    customerId: number,
    products: { productId: number; quantity: number }[]
  ): Promise<Order> {
    // Check if customer exists
    const customer = await this.customersRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    // Check if all products exist
    for (const item of products) {
      const productExists = await this.productsRepository.findOne({
        where: { id: item.productId },
      });
      if (!productExists) {
        throw new NotFoundException(
          `Product with ID ${item.productId} not found`
        );
      }
    }

    // Create the order
    const order = this.ordersRepository.create({ customer });
    const savedOrder = await this.ordersRepository.save(order);

    // Create order items
    for (const item of products) {
      const orderItem = this.orderItemsRepository.create({
        order: savedOrder,
        product: { id: item.productId }, // Reference product by ID
        quantity: item.quantity,
      });
      await this.orderItemsRepository.save(orderItem);
    }

    return savedOrder;
  }

  async getMostOrderingCustomer(
    startDate: string,
    endDate: string
  ): Promise<{ customerId: number; orderCount: number } | null> {
    const formattedStartDate = `${startDate} 00:00:00`;
    const formattedEndDate = `${endDate} 23:59:59`;

    const result = await this.ordersRepository
      .createQueryBuilder("order")
      .select("order.customerId", "customerId")
      .addSelect("COUNT(order.id)", "orderCount")
      .where("order.createdAt BETWEEN :start AND :end", {
        start: formattedStartDate,
        end: formattedEndDate,
      })
      .groupBy("order.customerId")
      .orderBy('"orderCount"', "DESC")
      .limit(1)
      .getRawOne();

    return result || null;
  }

  async getTopOrderedProducts() {
    const result = await this.ordersRepository
        .createQueryBuilder('orders')
        .innerJoin('orders.items', 'order_items')
        .innerJoin('order_items.product', 'product')
        .select('product.id', 'productId')
        .addSelect('product.name', 'productName')
        .addSelect('SUM(order_items.quantity)', 'totalQuantity') // ✅ Fix alias
        .groupBy('product.id, product.name')
        .orderBy('"totalQuantity"', 'DESC') // ✅ Fix alias
        .limit(10)
        .getRawMany();

    console.log('Top Ordered Products:', result);
    return result;
}


}
