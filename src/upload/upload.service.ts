import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class UploadsService {
  async generateSarcomaReport(filename: string) {
    const reportPath = this.ensureReportDirectory(filename);

    // Fake data
    const fakeReport = {
      "Type of Cancer": "Sarcoma",
      "Estimated Tumor Size": `${(Math.random() * 10 + 1).toFixed(2)} cm`,
      "Histological Grade": Math.floor(Math.random() * 4) + 1,
      "Metastasis": Math.random() > 0.5 ? "Present" : "Absent",
      "Estimated Survival Months": Math.floor(Math.random() * 60) + 12,
    };

    await this.createPdf(reportPath, filename, "Sarcoma Cancer Report", fakeReport);
    return { data: { ...fakeReport, filename: `${filename}.pdf` } };
  }

  async generateBrainReport(filename: string) {
    const reportPath = this.ensureReportDirectory(filename);

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
      "Size": `${(Math.random() * 5 + 1).toFixed(2)} cm`,
      "Estimated Edema": edemaLevels[Math.floor(Math.random() * edemaLevels.length)],
      "Contrast": Math.floor(Math.random() * (98 - 60 + 1)) + 60
    };

    await this.createPdf(reportPath, filename, "Brain Tumor Report", fakeReport);
    return { data: { ...fakeReport, filename: `${filename}.pdf` } };
  }

  async generateLeukemiaReport(filename: string) {
    const reportPath = this.ensureReportDirectory(filename);

    // Fake data
    const totalCells = Math.floor(Math.random() * (15000 - 9000 + 1)) + 9000;
    const abnormalCells = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    const abnormalPercentage = ((abnormalCells / totalCells) * 100).toFixed(2) + '%';
    const diagnoses = ["Benign", "Pre", "Pro", "Early"];

    const fakeReport = {
      "Type of Cancer": "Leukemia",
      "Type of Leukemia": "Acute Lymphoblastic Leukemia",
      "Diagnosis": diagnoses[Math.floor(Math.random() * diagnoses.length)],
      "Total Cells Analyzed": totalCells,
      "Abnormal Cells Detected": `${abnormalCells} (${abnormalPercentage})`,
      "Presence of Auer rods": "No",
      "Blast cells detected": "High nucleus-to-cytoplasm ratio"
    };

    await this.createPdf(reportPath, filename, "Leukemia Report", fakeReport);
    return { data: { ...fakeReport, filename: `${filename}.pdf` } };
  }

  private ensureReportDirectory(filename: string): string {
    const reportDir = path.join(__dirname, '..', '..', 'public', 'reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    return path.join(reportDir, `${filename}.pdf`);
  }

  private async createPdf(filePath: string, filename: string, title: string, reportData: any) {
    return new Promise<void>((resolve, reject) => {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      
      doc.fontSize(16).text(title, { align: "center" });
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
