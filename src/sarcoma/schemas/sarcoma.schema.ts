import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "sarcoma" }) // Ensure the collection name is explicitly set
export class Sarcoma extends Document {
  @Prop()
  patient_id: string;

  @Prop()
  age: string;

  @Prop()
  gender: string;

  @Prop()
  country: string;

  @Prop()
  tumor_size_cm: string;

  @Prop()
  tumor_location: string;

  @Prop()
  histological_grade: string;

  @Prop()
  metastasis: string;

  @Prop()
  survival_months: string;

  @Prop()
  survival_status: string;

  @Prop()
  file: string;
}

export const SarcomaSchema = SchemaFactory.createForClass(Sarcoma);
