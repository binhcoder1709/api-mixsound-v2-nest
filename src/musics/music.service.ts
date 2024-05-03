import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music } from 'src/schemas/Music.schema';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Music.name) private readonly musicModel: Model<Music>,
  ) {}

  async findAll(): Promise<Music[]> {
    return await this.musicModel.find().exec();
  }

  // find musics have type is vinahouse
  // async findByVinahouseType(): Promise<Music[]> {
  //   return await this.musicModel.find({ type: ['vinahouse'] }).exec();
  // }

  // find music by id
  async findById(id: string): Promise<Music> {
    return await this.musicModel.findById(id);
  }
}
