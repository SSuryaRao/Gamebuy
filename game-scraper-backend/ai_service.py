from transformers import pipeline
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load a pre-trained text classification model
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get("text", "")
    categories = data.get("categories", [])

    if not text or not categories:
        return jsonify({"error": "Invalid input"}), 400

    # Classify the text into categories
    results = classifier(text, categories)
    return jsonify(results)

if __name__ == "__main__":
    app.run(port=8000)
