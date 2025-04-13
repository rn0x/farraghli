import { execFile } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function burnSubtitle(videoPath, srtPath, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpegPath = path.join(__dirname, '../ffmpeg/bin/ffmpeg.exe');

    // استبدال الباك سلاش بـ /
    const srtFixedPath = srtPath.replace(/\\/g, '/').replace(':', '\\:'); // هنا الأهم!

    const style = [
      'FontName=Hacen Saudi Arabia',
      'FontSize=20',
      'PrimaryColour=&H00FFFF00',
      'Outline=1',
      'BorderStyle=1',
      'MarginV=20'
    ].join(',');

    const subtitleFilter = `subtitles='${srtFixedPath}':force_style='${style}'`;

    const args = [
      '-i', videoPath,
      '-vf', subtitleFilter,
      '-c:a', 'copy',
      outputPath,
      '-y'
    ];

    execFile(ffmpegPath, args, (error, stdout, stderr) => {
      console.log('ffmpeg', args.join(' '));
      if (error) {
        console.error('ffmpeg err:', stderr);
        reject(new Error(`❌ FFmpeg failed: ${error.message}`));
      } else {
        resolve(outputPath);
      }
    });
  });
}
