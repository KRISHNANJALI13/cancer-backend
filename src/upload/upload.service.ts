import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class UploadsService {
  async generateSarcomaReport(filename: string) {
    const reportDir = path.join(__dirname, '..', '..', 'public', 'reports'); // Corrected path
    const reportPath = path.join(reportDir, `${filename}.pdf`);

    // Ensure the directory exists
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // Fake data
    const fakeReport = {
      "Type of Cancer": "Sarcoma",
      "Estimated Tumor Size": `${(Math.random() * 10 + 1).toFixed(2)} cm`,
      "Histological Grade": Math.floor(Math.random() * 4) + 1,
      "Metastasis": Math.random() > 0.5 ? "Present" : "Absent",
      "Estimated Survival Months": Math.floor(Math.random() * 60) + 12,
    };

    // Generate PDF
    await this.createSarcomaPdf(reportPath, filename, fakeReport);

    return {
      data: {
        ...fakeReport,
      filename: `${filename}.pdf`,
      }
    };
  }

  async generateBrainReport(filename: string) {
    const reportDir = path.join(__dirname, '..', '..', 'public', 'reports'); // Corrected path
    const reportPath = path.join(reportDir, `${filename}.pdf`);

    // Ensure the directory exists
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // Possible values
    const shapes = ["Round", "Oval", "Irregular", "Diffused", "Cystic", "Necrotic", "Calcified"];
    const locations = [
        "Frontal Lobe", "Parietal Lobe", "Temporal Lobe", "Occipital Lobe",
        "Cerebellum", "Brainstem", "Thalamus", "Hypothalamus", "Pituitary Gland",
        "Ventricles", "Corpus Callosum", "Meninges", "Cranial Nerves"
    ];
    const edemaLevels = ["Low", "Moderate", "Severe"];

    // Fake data
    const fakeReport = {
      "Type of Cancer": "Brain Tumor",
      "Shape": shapes[Math.floor(Math.random() * shapes.length)],
      "Location": locations[Math.floor(Math.random() * locations.length)],
      "Class": Math.random() > 0.5 ? "Tumor" : "Non-Tumor",
      "Size": `${(Math.random() * 5 + 1).toFixed(2)} cm`, // Typical brain tumor sizes
      "Estimated Edema": edemaLevels[Math.floor(Math.random() * edemaLevels.length)],
      "Contrast": Math.floor(Math.random() * (98 - 60 + 1)) + 60 // Random value between 60 and 98
    };

    // Generate PDF
    await this.createBrainPdf(reportPath, filename, fakeReport);

    return {
      data: {
        ...fakeReport,
        filename: `${filename}.pdf`,
      }
    };
}

private async createBrainPdf(filePath: string, filename: string, reportData: any) {
    return new Promise<void>((resolve, reject) => {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);
      doc.fontSize(16).text("Brain Tumor Report", { align: "center" });
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


  private async createSarcomaPdf(filePath: string, filename: string, reportData: any) {
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
