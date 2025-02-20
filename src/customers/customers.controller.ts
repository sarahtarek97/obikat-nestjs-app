import { Controller, Post, Body, UseGuards, Query, Get } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Body() body: { name: string }) {
    return this.customersService.create(body.name);
  }
}
