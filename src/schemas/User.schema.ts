import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'musics', required: true })
  historyMusic: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'musics', required: true })
  likeTrack: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  status: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
