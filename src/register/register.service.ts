import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/register/dto/user-create.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // find one record by email service
  public async findByEmail(email: string): Promise<User> {
    try {
      const result = await this.userModel.findOne({ email }).exec();
      return result;
    } catch (error) {
      throw new Error('Error finding user by email');
    }
  }

  // create one record service
  public async createOne(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }
}
