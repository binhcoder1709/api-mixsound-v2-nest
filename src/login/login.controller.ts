import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from 'src/login/dto/user-login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post()
  @HttpCode(200)
  async loginUser(@Body() dataDto: LoginUserDto): Promise<string> {
    try {
      const response = await this.loginService.loginUser(dataDto);
      return response;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
