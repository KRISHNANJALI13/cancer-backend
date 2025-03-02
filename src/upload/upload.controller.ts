import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './upload.service';
import * as fs from 'fs';
import * as exifParser from 'exif-parser';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Accepts file under "file" key
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: "No file uploaded" };
    }

    // Read image metadata
    const metadata = this.extractMetadata(file.buffer);
    console.log("Extracted Metadata:", metadata);

    // Check if ImageDescription is "Tumor"
    if (metadata?.ImageDescription === "Tumor") {
      const filename = file.originalname.split('.')[0]; // Remove file extension
      return await this.uploadsService.generateFakeReport(filename);
    }
    else if (metadata?.ImageDescription === "Non Tumor"){
      return { data: "no tumor" };
    }
    else {
      return { data: "Error scanning the image" };
    }
  }

  private extractMetadata(buffer: Buffer) {
    try {
      const parser = exifParser.create(buffer);
      const result = parser.parse();
      return result.tags; // Extracted EXIF metadata
    } catch (error) {
      console.error("Error extracting metadata:", error);
      return null;
    }
  }
}
