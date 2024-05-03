import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypeMusic } from 'src/schemas/TypeMusic.schema';

@Injectable()
export class TypeMusicService {
  constructor(
    @InjectModel(TypeMusic.name) private typeMusicModel: Model<TypeMusic>,
  ) {}

  async findAll(): Promise<TypeMusic[]> {
    return await this.typeMusicModel.find().exec();
  }
}
