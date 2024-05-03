import { Injectable, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/login/dto/user-login.dto';
import { User } from 'src/schemas/User.schema';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private tokenService: TokenService,
  ) {}

  // find one record by email service
  async findByEmail(email: string): Promise<User> {
    try {
      const result = await this.userModel.findOne({ email }).exec();
      return result;
    } catch (error) {
      throw new Error('Error finding user by email');
    }
  }

  async loginUser(dataDto: LoginUserDto): Promise<string> {
    const dataUser = await this.findByEmail(dataDto.email);
    const tokenData = {
      _id: dataUser._id,
      userName: dataUser.userName,
      email: dataUser.email,
      avatar: dataUser.avatar,
      phoneNumber: dataUser.phoneNumber,
      role: dataUser.role,
    };
    if (dataUser) {
      return this.tokenService.accessToken(tokenData);
    }
  }
}
