import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeMusic, TypeMusicSchema } from 'src/schemas/TypeMusic.schema';
import { TypeMusicService } from './typeMusic.service';
import { TypeMusicController } from './typeMusic.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TypeMusic.name,
        schema: TypeMusicSchema,
      },
    ]),
  ],
  controllers: [TypeMusicController],
  providers: [TypeMusicService],
})
export class TypeMusicModule {}
