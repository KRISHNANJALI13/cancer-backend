import { Controller, Get, Query } from '@nestjs/common';
import { LeukemiaService } from './leukemia.service';

@Controller('leukemia')
export class LeukemiaController {
  constructor(private readonly leukemiaService: LeukemiaService) {}

  @Get()
  async getLeukemiaRecords(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.leukemiaService.getAllLeukemiaRecords(Number(page), Number(limit));
  }
}
