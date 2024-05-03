import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/User.schema';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  @HttpCode(200)
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }
}
