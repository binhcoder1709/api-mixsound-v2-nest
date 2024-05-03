import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    // verify token
    if (token) {
      const authorizated = await this.tokenService.verifyToken(token);
      if (authorizated) {
        next();
      } else {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException(
        'Authorization token not found',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
