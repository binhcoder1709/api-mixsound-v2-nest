import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RegisterService } from './register.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {
  constructor(private registerService: RegisterService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!data.email || !data.userName || !data.password) {
      throw new HttpException('Missing Data Fields', HttpStatus.BAD_REQUEST);
    }

    if (await this.checkEmptyUser(data.email)) {
      throw new HttpException('Email Already Exist', HttpStatus.BAD_REQUEST);
    }

    if (!this.isEmailRegex(data.email)) {
      throw new HttpException('Invalid Email Format', HttpStatus.BAD_REQUEST);
    }

    if (this.passwordLength(data.password)) {
      throw new HttpException(
        'Password must be at least 8 characters',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.hashPassword(data.password);
    data.password = hashedPassword;

    next();
  }

  async checkEmptyUser(email: string): Promise<boolean> {
    const dataCheck = await this.registerService.findByEmail(email);
    if (dataCheck) {
      return !!dataCheck;
    }
  }

  isEmailRegex(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  passwordLength(password: string): boolean {
    if (password.length < 8) {
      return true;
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
