import warnings
warnings.filterwarnings("ignore", category=UserWarning)

import whisper
import argparse
import os
import json
import sys
import traceback
from datetime import timedelta

# إضافة ffmpeg للمسار
os.environ["PATH"] += os.pathsep + os.path.join(os.path.dirname(__file__), "ffmpeg", "bin")

# تنسيق التوقيت لـ SRT
def format_timestamp(seconds):
    delta = timedelta(seconds=seconds)
    total_seconds = int(delta.total_seconds())
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60
    milliseconds = int((delta.total_seconds() - total_seconds) * 1000)
    return f"{hours:02}:{minutes:02}:{seconds:02},{milliseconds:03}"

try:
    parser = argparse.ArgumentParser()
    parser.add_argument("video")
    parser.add_argument("--model", default="base")
    parser.add_argument("--language", default="ar")
    parser.add_argument("--task", default="transcribe")
    args = parser.parse_args()

    # تحميل النموذج مباشرة (من الكاش أو من الإنترنت)
    model = whisper.load_model(args.model)
    print(f"Loaded model: {args.model}")

    # تنفيذ التفريغ أو الترجمة
    result = model.transcribe(
        args.video,
        language=args.language,
        task=args.task,
        word_timestamps=True
    )

    video_dir = os.path.dirname(args.video)
    video_name = os.path.splitext(os.path.basename(args.video))[0]

    srt_path = os.path.join(video_dir, f"{video_name}.srt")
    txt_path = os.path.join(video_dir, f"{video_name}.txt")
    json_path = os.path.join(video_dir, f"{video_name}.json")

    # حفظ SRT
    with open(srt_path, "w", encoding="utf-8") as f:
        index = 1
        for segment in result["segments"]:
            for word in segment.get("words", []):
                if "start" in word and "end" in word and "word" in word:
                    start = format_timestamp(word["start"])
                    end = format_timestamp(word["end"])
                    text = word["word"].strip()
                    if text:
                        f.write(f"{index}\n{start} --> {end}\n{text}\n\n")
                        index += 1

    # حفظ TXT
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(result["text"].strip())

    # حفظ JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

except Exception:
    traceback.print_exc()
    sys.exit(1)
