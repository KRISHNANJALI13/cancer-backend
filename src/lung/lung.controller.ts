import { Controller, Get, Query } from "@nestjs/common";
import { LungService } from "./lung.service";

@Controller("lung")
export class LungController {
  constructor(private readonly lungService: LungService) {}

  @Get()
  async getLungData(@Query("page") page: string, @Query("limit") limit: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.lungService.getLungData(pageNumber, limitNumber);
  }

  @Get('field-data')
  async getFieldData(@Query('field') field: string) {
    return this.lungService.getFieldData(field);
  }
}