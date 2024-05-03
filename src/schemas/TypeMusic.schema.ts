import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'music-type' })
export class TypeMusic extends Document {
  @Prop({ required: true })
  typeName: string;

  @Prop({ type: mongoose.Schema.Types.Array, required: true })
  data: mongoose.Schema.Types.Array;
}

export const TypeMusicSchema = SchemaFactory.createForClass(TypeMusic);
