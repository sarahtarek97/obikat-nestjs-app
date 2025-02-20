import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./products.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async create(name: string): Promise<Product> {
    const product = this.productsRepository.create({ name });
    return this.productsRepository.save(product);
  }
}
