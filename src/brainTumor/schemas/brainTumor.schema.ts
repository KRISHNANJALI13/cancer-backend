import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "brain" })
export class BrainTumor extends Document {
  @Prop()
  Image: string;

  @Prop()
  Class: string;

  @Prop()
  Mean: number;

  @Prop()
  Variance: number;

  @Prop()
  StandardDeviation: number;

  @Prop()
  Entropy: number;

  @Prop()
  Skewness: number;

  @Prop()
  Kurtosis: number;

  @Prop()
  Contrast: number;

  @Prop()
  Energy: number;

  @Prop()
  ASM: number;

  @Prop()
  Homogeneity: number;

  @Prop()
  Dissimilarity: number;

  @Prop()
  Correlation: number;

  @Prop()
  Coarseness: number;
}

export const BrainTumorSchema = SchemaFactory.createForClass(BrainTumor);
