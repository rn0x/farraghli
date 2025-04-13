const processBtn = document.getElementById('processBtn');
const modelInput = document.getElementById('model');
const langInput = document.getElementById('language');
const taskInput = document.getElementById('task');
const output = document.getElementById('output');

let videoPath = '';

document.getElementById('videoInput').addEventListener('click', async () => {
  const path = await window.api.selectVideo();
  if (path) {
    videoPath = path;
    log(`📁 تم اختيار الملف: ${videoPath}`);
  } else {
    log('❌ لم يتم اختيار أي ملف.');
  }
});


processBtn.addEventListener('click', async () => {
  if (!videoPath) return log('❌ الرجاء اختيار فيديو أولاً.');
  if (!savePath) return log('❌ الرجاء تحديد مكان حفظ الفيديو.');

  const model = modelInput.value;
  const lang = langInput.value;
  const task = taskInput.value;

  setProgress('🔁 [1/3] جاري استخراج الترجمة من الفيديو...');
  log(`🔁 جاري تحويل الفيديو باستخدام: model=${model}, lang=${lang}, task=${task}`);

  const transcribeRes = await window.api.transcribe(videoPath, model, lang, task);
  if (!transcribeRes.success) {
    setProgress('❌ فشل في استخراج الترجمة.');
    return log(`❌ خطأ في الترجمة: ${transcribeRes.error}`);
  }

  setProgress('✅ [2/3] تم استخراج الترجمة بنجاح.\n🔁 [3/3] جاري دمج الترجمة مع الفيديو...');

  const srtPath = videoPath.replace(/\.[^/.]+$/, '.srt');
  const burnRes = await window.api.burn(videoPath, srtPath, savePath);

  console.log("srtPath: ", srtPath);


  if (!burnRes.success) {
    setProgress('❌ فشل في دمج الترجمة.');
    console.error(transcribeRes.error);
    return log(`❌ خطأ في دمج الترجمة: ${burnRes.error}`);
  }

  setProgress('✅ تم الانتهاء من جميع الخطوات بنجاح!');
  log(`🎉 تم إنشاء الفيديو النهائي:\n${burnRes.path}`);
});



function log(msg) {
  output.textContent += msg + '\n';
}


const saveBtn = document.getElementById('saveLocationBtn');
const savePathLabel = document.getElementById('selectedPath');

let savePath = '';

saveBtn.addEventListener('click', async () => {
  const path = await window.api.selectSavePath();
  if (path) {
    savePath = path;
    savePathLabel.textContent = `📍 سيتم الحفظ في: ${savePath}`;
  } else {
    savePath = '';
    savePathLabel.textContent = '❌ لم يتم تحديد مسار للحفظ.';
  }
});


const progress = document.getElementById('progress');

function setProgress(text) {
  progress.textContent = text;
}
