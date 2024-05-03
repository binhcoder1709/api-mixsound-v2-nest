import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { Music } from 'src/schemas/Music.schema';

@Controller('musics')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  // get music by id
  @Get(':id')
  @HttpCode(200)
  getMusicById(@Param('id') id: string) {
    try {
      return this.musicService.findById(id);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get musics have type is vinahouse
  @Get('vinahouse')
  @HttpCode(200)
  getVinahouseMusics() {
    try {
      // return this.musicService.findByVinahouseType();
      // console.log(this.musicService.findByVinahouseType());
      
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
