import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class UploadsService {
  async generateFakeReport(filename: string) {
    const reportDir = path.join(__dirname, '..', '..', 'public', 'reports'); // Corrected path
    const reportPath = path.join(reportDir, `${filename}.pdf`);

    // Ensure the directory exists
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // Fake data
    const fakeReport = {
      "Estimated Tumor Size": `${(Math.random() * 10 + 1).toFixed(2)} cm`,
      "Histological Grade": Math.floor(Math.random() * 4) + 1,
      "Metastasis": Math.random() > 0.5 ? "Present" : "Absent",
      "Estimated Survival Months": Math.floor(Math.random() * 60) + 12,
    };

    // Generate PDF
    await this.createPdf(reportPath, filename, fakeReport);

    return {
      data: {
        ...fakeReport,
      filename: `${filename}.pdf`,
      }
    };
  }

  private async createPdf(filePath: string, filename: string, reportData: any) {
    return new Promise<void>((resolve, reject) => {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);
      doc.fontSize(16).text("Sarcoma Cancer Report", { align: "center" });
      doc.moveDown();
      
      doc.fontSize(12).text(`Patient ID: ${filename}`, { align: "left" });
      doc.moveDown();

      for (const [key, value] of Object.entries(reportData)) {
        doc.fontSize(12).text(`${key}: ${value}`, { align: "left" });
        doc.moveDown();
      }

      doc.end();
      stream.on("finish", () => resolve());
      stream.on("error", reject);
    });
  }
}
