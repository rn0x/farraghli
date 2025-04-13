import 'v8-compile-cache';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { transcribe } from './utils/transcribe.mjs';
import { burnSubtitle } from './utils/burn.mjs';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.setAppUserModelId("com.farraghli.app");

// إعداد المسار الكامل للملف
const logPath = path.join(app.getPath('userData'), 'farraghli.log');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

// دالة كتابة السجل مع التاريخ واسم التطبيق
function logWithTimestamp(msg) {
  const timestamp = new Date().toISOString();
  const formatted = `[${timestamp}] [Farraghli] ${msg}`;
  logStream.write(formatted);
}

// توجيه stdout و stderr
process.stdout.write = (msg) => logWithTimestamp(msg);
process.stderr.write = (msg) => logWithTimestamp(msg);

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 1000,
        minHeight: 700,
        show: true,
        center: true,
        frame: true,
        title: 'فرّغلي',
        icon: path.join(__dirname, 'assets', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win?.removeMenu();
    win.loadFile('index.html');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// استقبال من الواجهة
ipcMain.handle('transcribe', async (_, video, model, lang, task) => {
    try {
        await transcribe(video, model, lang, task);
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
});


ipcMain.handle('burn', async (_, video, srt, outputPath) => {
    try {
        const result = await burnSubtitle(video, srt, outputPath);
        return { success: true, path: result };
    } catch (err) {
        return { success: false, error: err.message };
    }
});


ipcMain.handle('select-video', async () => {
    const result = await dialog.showOpenDialog({
        title: 'اختر فيديو',
        properties: ['openFile'],
        filters: [
            { name: 'Videos', extensions: ['mp4', 'mov', 'mkv', 'avi'] }
        ]
    });

    if (result.canceled || result.filePaths.length === 0) {
        return null;
    }

    return result.filePaths[0]; // مسار الفيديو الكامل
});

ipcMain.handle('select-save', async () => {
    const result = await dialog.showSaveDialog({
        title: 'اختر مكان حفظ الفيديو النهائي',
        defaultPath: 'final_output.mp4',
        filters: [{ name: 'MP4 Video', extensions: ['mp4'] }]
    });

    if (result.canceled || !result.filePath) return null;
    return result.filePath;
});
