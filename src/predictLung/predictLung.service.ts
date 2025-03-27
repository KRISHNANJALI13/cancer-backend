import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class PredictLungService {
  async predict(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(process.cwd(), 'src', 'predictLung', 'predict.py');
      const pythonProcess = spawn('python', [scriptPath], { shell: true });

      // Send JSON input to Python script
      pythonProcess.stdin.write(JSON.stringify(data));
      pythonProcess.stdin.end();

      let result = '';

      pythonProcess.stdout.on('data', (chunk) => {
        result += chunk.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        reject(`Error: ${data}`);
      });

      pythonProcess.on('close', () => {
        try {
          resolve(JSON.parse(result));
        } catch (error) {
          reject(`JSON Parse Error: ${error}`);
        }
      });
    });
  }
}
