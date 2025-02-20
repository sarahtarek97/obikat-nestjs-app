import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "./customers.entity";
import { OrdersService } from "../orders/orders.service";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @Inject(forwardRef(() => OrdersService)) private ordersService: OrdersService // ✅ Inject OrdersService properly
  ) {}

  async findOne(id: number): Promise<Customer | null> {
    return await this.customersRepository.findOne({ where: { id } });
  }

  async create(name: string): Promise<Customer> {
    const customer = this.customersRepository.create({ name });
    return this.customersRepository.save(customer);
  }
}
