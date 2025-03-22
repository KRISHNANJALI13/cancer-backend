import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lung } from "./schemas/lung.schema";

@Injectable()
export class LungService {
  constructor(@InjectModel("Lung") private lungModel: Model<Lung>) {}

  async getLungData(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const totalRecords = await this.lungModel.countDocuments();
    
    if (totalRecords === 0) {
      return {
        data: [],
        totalRecords: 0,
        currentPage: page,
        totalPages: 0,
      };
    }
  
    const data = await this.lungModel.find().skip(skip).limit(limit);
  
    return {
      data,
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
    };

  }
  async getFieldData(field: string) {
    if (!field) {
      throw new Error('Field parameter is required');
    }
    const records = await this.lungModel.find().select(field).lean();
    return records.map(record => record[field]);
  }
}