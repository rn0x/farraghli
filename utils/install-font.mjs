// install-font.mjs

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontName = 'Hacen Saudi Arabia.ttf';
const sourcePath = path.join(__dirname, fontName);
const destPath = path.join(process.env.WINDIR, 'Fonts', fontName);

if (!fs.existsSync(destPath)) {
    try {
        fs.copyFileSync(sourcePath, destPath);

        execSync(
            `reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts" /v "Hacen Saudi Arabia (TrueType)" /t REG_SZ /d "${fontName}" /f`,
            { stdio: 'ignore' }
        );

        console.log('Font installed successfully.');
    } catch (err) {
        console.error('Failed to install the font:', err.message);
    }
} else {
    console.log('Font is already installed.');
}
