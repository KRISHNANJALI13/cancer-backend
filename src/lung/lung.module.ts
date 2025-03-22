import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LungController } from "./lung.controller";
import { LungService } from "./lung.service";
import { LungSchema } from "./schemas/lung.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Lung", schema: LungSchema }])],
  controllers: [LungController],
  providers: [LungService],
})
export class LungModule {}
