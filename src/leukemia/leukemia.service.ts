import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leukemia } from './schemas/leukemia.schema';

@Injectable()
export class LeukemiaService {
  private readonly logger = new Logger(LeukemiaService.name);

  constructor(@InjectModel('leukemia') private readonly leukemiaModel: Model<Leukemia>) {}

  async getAllLeukemiaRecords(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const totalRecords = await this.leukemiaModel.countDocuments();

      if (totalRecords === 0) {
        return {
          data: [],
          totalRecords: 0,
          currentPage: page,
          totalPages: 0,
        };
      }

      const data = await this.leukemiaModel.find().skip(skip).limit(limit).exec();
      return {
        data,
        totalRecords,
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
      };
  }
}
