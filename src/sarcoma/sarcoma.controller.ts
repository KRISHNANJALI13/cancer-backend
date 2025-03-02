import { Controller, Get, Query } from "@nestjs/common";
import { SarcomaService } from "./sarcoma.service";

@Controller("sarcoma")
export class SarcomaController {
  constructor(private readonly sarcomaService: SarcomaService) {}

  @Get()
async getSarcomaData(@Query("page") page: string, @Query("limit") limit: string) {
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  
  return this.sarcomaService.getSarcomaData(pageNumber, limitNumber);
}

}
