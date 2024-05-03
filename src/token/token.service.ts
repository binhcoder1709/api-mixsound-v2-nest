import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // Service to generate access token
  accessToken(data: object): string {
    if (!data) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    }
    const token = this.jwtService.sign(data, {
      secret: process.env.TOKEN_SECRET_KEY,
    });
    return token;
  }

  // Service to verify token
  async verifyToken(token: string): Promise<boolean> {
    if (!token) {
      throw new HttpException('Token Not Found', HttpStatus.FORBIDDEN);
    }
    const verify = await this.jwtService.verify(token, {
      secret: process.env.TOKEN_SECRET_KEY,
    });
    if(!verify)
      {
        throw new HttpException("Token Is Not Valid", HttpStatus.UNAUTHORIZED)
      }
    return true;
  }
}
