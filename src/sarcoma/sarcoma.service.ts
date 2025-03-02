import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Sarcoma } from "./schemas/sarcoma.schema";

@Injectable()
export class SarcomaService {
  constructor(@InjectModel("Sarcoma") private sarcomaModel: Model<Sarcoma>) {}

  async getSarcomaData(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const totalRecords = await this.sarcomaModel.countDocuments();
    
    if (totalRecords === 0) {
      return {
        data: [],
        totalRecords: 0,
        currentPage: page,
        totalPages: 0,
      };
    }
  
    const data = await this.sarcomaModel.find().skip(skip).limit(limit);
  
    return {
      data,
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
    };
  }
  
}
