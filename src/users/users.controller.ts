import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //@UseGuards(JwtAuthGuard)
  @Post("register")
  async register(@Body() body: { username: string; password: string }) {
    return this.usersService.create(body.username, body.password);
  }
}
