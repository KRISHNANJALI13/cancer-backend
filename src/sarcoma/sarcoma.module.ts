import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SarcomaController } from "./sarcoma.controller";
import { SarcomaService } from "./sarcoma.service";
import { SarcomaSchema } from "./schemas/sarcoma.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Sarcoma", schema: SarcomaSchema }])],
  controllers: [SarcomaController],
  providers: [SarcomaService],
})
export class SarcomaModule {}
