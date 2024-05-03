import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from 'src/register/dto/user-create.dto';
import { User } from 'src/schemas/User.schema';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @HttpCode(201)
  async addUser(@Body() dataDto: CreateUserDto): Promise<User | object> {
    try {
      const newUser = await this.registerService.createOne(dataDto);
      return { message: 'Add Data Successfully' };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
