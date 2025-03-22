import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BrainTumorService } from "./brainTumor.service";
import { BrainTumor, BrainTumorSchema } from "./schemas/brainTumor.schema";
import { BrainTumorController } from "./brainTumor.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Brain", schema: BrainTumorSchema }]),
  ],
  controllers: [BrainTumorController],
  providers: [BrainTumorService],
  exports: [BrainTumorService], // <-- Make sure to export if used elsewhere
})
export class BrainTumorModule {}
