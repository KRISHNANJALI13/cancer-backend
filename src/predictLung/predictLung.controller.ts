import { Controller, Post, Body } from '@nestjs/common';
import { PredictLungService } from './predictLung.service';

@Controller('predict-lung')
export class PredictLungController {
  constructor(private readonly predictLungService: PredictLungService) {}

  @Post()
  async predictLung(@Body() inputData: any) {
    return this.predictLungService.predict(inputData);
  }
}
