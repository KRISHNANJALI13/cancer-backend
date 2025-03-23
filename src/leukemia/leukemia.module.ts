import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeukemiaController } from './leukemia.controller';
import { LeukemiaService } from './leukemia.service';
import { Leukemia, LeukemiaSchema } from './schemas/leukemia.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'leukemia', schema: LeukemiaSchema }])],
  controllers: [LeukemiaController],
  providers: [LeukemiaService],
})
export class LeukemiaModule {}
