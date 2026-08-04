from flask import Flask, request, jsonify
from flask_cors import CORS
from langdetect import detect, DetectorFactory
from textblob import TextBlob
import json
import re

app = Flask(__name__)
CORS(app)
with open("AI cultural translator_dictionary.json", "r", encoding="utf-8") as f:
    slang_dict = json.load(f)

with open("cultural_mappings.json", "r", encoding="utf-8") as f:
    cultural_dict = json.load(f)
    
def detect_slang(text):
    found = {}

    for entry in slang_dict["entries"]:
        term = entry["term"]

        if term in text:
            found[term] = {
                "meaning": entry["cultural_meaning"],
                "language": entry["language"],
                "category": entry["category"]
            }

    return found

def detect_tone(text):
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    if polarity > 0:
        return "Positive"
    elif polarity < 0:
        return "Negative"
    else:
        return "Neutral"

def cultural_meaning(text):

    normalized = re.sub(r"[。、！？.,!?]", "", text)

    found = {}

    for mapping in cultural_dict["mappings"]:

        # English
        eng = mapping["english"]["expression"]
        if eng.lower() in text.lower():
            found["english"] = mapping["english"]

        # Tamil
        ta = mapping["tamil"]["expression"]
        if ta in text:
            found["tamil"] = mapping["tamil"]

        # Japanese
        jp = mapping["japanese"]["expression"]
        jp_normalized = re.sub(r"[。、！？.,!?]", "", jp)

        if jp_normalized in normalized:
            found["japanese"] = mapping["japanese"]

    return found

DetectorFactory.seed = 0

def detect_language(text):
    text = text.strip()

    try:
        code = detect(text)

        language_map = {
            "en": "English",
            "ta": "Tamil",
            "ja": "Japanese"
        }

        return language_map.get(code, code)

    except:
        return "Unknown"


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json
    text = data.get("text", "")

    lang = detect_language(text)

    slang = detect_slang(text)
    tone = detect_tone(text)
    culture = cultural_meaning(text)

    response = {
        "original_text": text,
        "language": lang,
        "tone": tone,
        "slang_detected": slang,
        "cultural_meaning": culture
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)