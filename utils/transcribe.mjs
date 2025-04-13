import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function transcribe(videoPath, model = 'base', lang = 'ar', mode = 'transcribe') {
  return new Promise((resolve, reject) => {
    const pythonPath = path.join(__dirname, '../python-embed/python.exe');
    const scriptPath = path.join(__dirname, '../whisper_local.py');

    const whisper = spawn(pythonPath, [
      scriptPath,
      videoPath,
      '--model', model,
      '--language', lang,
      '--task', mode
    ]);

    let stderrData = '';

    whisper.stdout.on('data', (data) => {
      process.stdout.write(`Whisper: ${data}`);
    });

    whisper.stderr.on('data', (data) => {
      stderrData += data.toString();
      process.stderr.write(`Whisper Error: ${data}`);
    });

    whisper.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Whisper failed with code ${code}\n\n${stderrData.trim()}`));
      } else {
        resolve();
      }
    });
  });
}
