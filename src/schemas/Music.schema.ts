import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'musics', timestamps: true })
export class Music extends Document {
  @Prop({ required: true })
  musicName: string;

  @Prop({ required: true })
  musicImage: string;

  @Prop({ required: true })
  musicSource: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Array, ref: "musicType",required: true })
  type: mongoose.Schema.Types.Array
}

export const MusicSchema = SchemaFactory.createForClass(Music);
