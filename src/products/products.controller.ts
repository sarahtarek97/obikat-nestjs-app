import { Controller, Post, Body, Get, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Body() body: { id: number; name: string }) {
    return this.productsService.create(body.name);
  }
}
