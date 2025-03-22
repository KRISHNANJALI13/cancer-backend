import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BrainTumor } from "./schemas/brainTumor.schema";

@Injectable()
export class BrainTumorService {
  constructor(@InjectModel("Brain") private brainTumorModel: Model<BrainTumor>) {}

  async getBrainTumorData(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const totalRecords = await this.brainTumorModel.countDocuments();

    if (totalRecords === 0) {
      return {
        data: [],
        totalRecords: 0,
        currentPage: page,
        totalPages: 0,
      };
    }

    const data = await this.brainTumorModel.find().skip(skip).limit(limit);
    return {
      data,
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
    };
  }
}
