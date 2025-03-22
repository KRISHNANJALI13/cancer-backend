import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "lung" })
export class Lung extends Document {
  @Prop()
  Patient_Id: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  air_pollution: number;

  @Prop()
  dust_allergy: number;

  @Prop()
  occupational_hazards: number;

  @Prop()
  genetics: number;

  @Prop()
  chronic_lung: number;

  @Prop()
  obesity: number;

  @Prop()
  smoking: number;

  @Prop()
  passive_smoker: number;

  @Prop()
  chest_pain: number;

  @Prop()
  coughing_of_blood: number;

  @Prop()
  weight_loss: number;

  @Prop()
  wheezing: number;

  @Prop()
  frequent_cold: number;

  @Prop()
  dry_cough: number;

  @Prop()
  snoring: number;

  @Prop()
  level: string;
}

export const LungSchema = SchemaFactory.createForClass(Lung);
