
const { contextBridge, ipcRenderer } = require('electron');

console.log('🧠 preload.mjs تم تحميله بنجاح');

contextBridge.exposeInMainWorld('api', {
  selectVideo: () => ipcRenderer.invoke('select-video'),
  selectSavePath: () => ipcRenderer.invoke('select-save'),
  transcribe: (video, model, lang, task) => ipcRenderer.invoke('transcribe', video, model, lang, task),
  burn: (video, srt, output) => ipcRenderer.invoke('burn', video, srt, output)
});
