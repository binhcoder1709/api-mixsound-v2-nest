import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoginService } from './login.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    if (!(await this.checkExistData(data.email))) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    }

    if (!this.isEmailRegex(data.email)) {
      throw new HttpException('Invalid Email Format', HttpStatus.BAD_REQUEST);
    }

    if (!(await this.decryptionPassword(data.email, data.password))) {
      throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
    }

    next();
  }

  async checkExistData(email: string): Promise<boolean> {
    const checkExist = await this.loginService.findByEmail(email);
    if (checkExist) {
      return true;
    }
    return false;
  }

  isEmailRegex(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async decryptionPassword(email: string, password: string) {
    const checkUser = await this.loginService.findByEmail(email);
    if (!checkUser) {
      return false;
    }
    return bcrypt.compare(password, checkUser.password);
  }
}
