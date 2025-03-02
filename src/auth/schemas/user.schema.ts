import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  uname: string; // Updated from 'username' to 'uname'

  @Prop({ required: true })
  pwd: string; // Updated from 'password' to 'pwd'
}

export const UserSchema = SchemaFactory.createForClass(User);
