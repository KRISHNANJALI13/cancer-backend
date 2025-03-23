import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'leukemia' })  // Ensure it connects to the correct collection
export class Leukemia extends Document {
  @Prop({ required: true })
  patient_id: string;

  @Prop({ default: 'Acute Lymphoblastic Leukemia' })
  type: string;

  @Prop({ required: true })
  diagnosis: string;

  @Prop({ required: true })
  file: string;
}

export const LeukemiaSchema = SchemaFactory.createForClass(Leukemia);
