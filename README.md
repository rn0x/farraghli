# فرّغلي (Farraghli)

<br>

<div align="center">

![preview](/screenshots/farraghli.png)
<br>

![preview](/screenshots/Farraghli_WX2bAAGlmQ.png)
<br>


![GitHub all releases](https://img.shields.io/github/downloads/rn0x/farraghli/total?color=blue&label=Total%20Downloads)

</div>

**فرّغلي** هو تطبيق سطح مكتب مبني باستخدام **Electron**، ويستخدم تقنية **Whisper** من OpenAI لتحويل الكلام المسموع في مقاطع الفيديو إلى نص مكتوب بدقة عالية، مع إمكانية الترجمة وحفظ الترجمة النصية بصيغ متعددة: `.srt` و `.txt` و `.json`.

---

## 🔧 المميزات

- 🎤 تحويل الكلام من مقاطع الفيديو إلى نص باستخدام Whisper
- 🌍 دعم لغات متعددة منها: العربية، الإنجليزية، الفرنسية، الإسبانية
- 📜 إخراج ملفات الترجمة بصيغ `.srt`, `.txt`, `.json`
- 🔥 إمكانية دمج الترجمة النصية في الفيديو باستخدام خط Hacen Saudi Arabia
- 🧠 دعم نماذج Whisper: `base`, `small`, `medium`
- ⚙️ عند عدم توفر النموذج محليًا، يتم تحميله تلقائيًا إلى المجلد الافتراضي مثل:
  `C:/Users/USERNAME/.cache/whisper`
- 🖋 يتوفر سكربت لتثبيت خط Hacen Saudi Arabia يدويًا عبر PowerShell أو CMD

---

## 📁 المستودع

- GitHub: [https://github.com/rn0x/farraghli](https://github.com/rn0x/farraghli)

---

## 🚀 خطوات التثبيت

1. **استنساخ المشروع:**

```bash
git clone https://github.com/rn0x/farraghli.git
cd farraghli
```

2. **تثبيت التبعيات:**

```bash
npm install
```

3. **تثبيت الخط:**

```bash
node utils/install-font.mjs
```

4. **تشغيل التطبيق بوضع التطوير:**

```bash
npm run dev
```

5. **بناء التطبيق لنظام ويندوز:**

```bash
npm run build
```

---

## 🏗 هيكل المشروع

```bash
farraghli/
├── assets/                  # الأيقونات والموارد
├── ffmpeg/                  # ملفات FFmpeg التنفيذية
├── python-embed/            # نسخة بايثون محمولة
├── utils/                   # خطوط وسكربتات مساعدة
│   ├── Cairo-Regular.ttf
│   ├── Hacen Saudi Arabia.ttf
│   ├── install-font.mjs     # سكربت تثبيت الخط
│   ├── transcribe.mjs       # تنفيذ عملية التفريغ
│   └── burn.mjs             # اضافة الترجمة على الفيديو
├── index.html               # واجهة المستخدم
├── style.css                # تنسيقات الواجهة
├── whisper_local.py         # الواجهة الرئيسية لـ Whisper
├── renderer.js              # التحكم بالواجهة
├── main.mjs                 # نقطة دخول Electron
├── preload.js               # سكربت التهيئة
├── package.json             # إعدادات المشروع
```

---

## 📦 مخرجات البناء

بعد تنفيذ `npm run build`، سيتم إنشاء:

- ملف التثبيت: `Farraghli Setup 1.0.0.exe`
- نسخة غير مضغوطة: `dist/win-unpacked/`

---

## 📝 الرخصة

هذا المشروع مرخّص تحت رخصة **MIT**.

---

## ❤️ المساهمة

مرحبًا بجميع المساهمات. يمكنك فتح issues أو إرسال pull requests لأي تحسينات أو إضافات.

---

## 📂 ملاحظة حول ملفات الإخراج

- يتم حفظ ملفات التفريغ أو الترجمة بصيغ `.srt` و `.txt` و `.json` في **نفس مجلد الفيديو الأصلي** الذي قمت باختياره.

---

## 📥 تحميل التطبيق

- **الإصدار:** `v1.0.0`
- **التحميل المباشر للتطبيق:**  
  [⬇️ Farraghli Setup (exe)](https://github.com/rn0x/farraghli/releases/latest)

### ⚠️ ملاحظة مهمة:

يجب تحميل الملف التالي وفك ضغطه داخل مجلد المشروع الرئيسي قبل التشغيل أو البناء:

- **📦 Python Embedded:**  
  [تحميل `python-embed.zip`](https://github.com/rn0x/farraghli/releases/latest)  
  بعد فك الضغط، يجب أن يكون المجلد الناتج اسمه `python-embed` ويكون في نفس مستوى الملفات مثل `main.mjs` و `whisper_local.py`.

---

| قبل                                  | بعد                                 |
| ------------------------------------ | ----------------------------------- |
| ![قبل](/screenshots/demo_before.gif) | ![بعد](/screenshots/demo_after.gif) |

---

## ⭐ هل أعجبك المشروع؟

ادعمه بنجمة ⭐ على GitHub!
