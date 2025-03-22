import { Controller, Get, Query, UsePipes, ParseIntPipe } from "@nestjs/common";
import { BrainTumorService } from "./brainTumor.service";

@Controller("brain-tumor")
export class BrainTumorController {
  constructor(private readonly brainTumorService: BrainTumorService) {}

  @Get()
  async getBrainTumorData(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number
  ) {
    return this.brainTumorService.getBrainTumorData(page, limit);
  }
}
