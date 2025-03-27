import { Module } from '@nestjs/common';
import { PredictLungController } from './predictLung.controller';
import { PredictLungService } from './predictLung.service';

@Module({
  controllers: [PredictLungController],
  providers: [PredictLungService],
})
export class PredictLungModule {}
