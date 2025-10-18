# AI Powered Resume Analyzer (API)
from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
import docx
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import os

app = Flask(__name__)

# ---------------- Load Mistral once at startup ----------------
MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.1"
print("⏳ Loading Mistral model... this may take a few minutes.")

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    torch_dtype=torch.bfloat16,
    device_map="auto",
    trust_remote_code=True
)

print("✅ Model loaded successfully!")

# ---------------- File reading functions ----------------
def read_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text.strip()

def read_docx(file_path):
    doc = docx.Document(file_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text.strip()

# ---------------- Mistral response generator ----------------
def generate_analysis(prompt, max_new_tokens=800):
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=2048).to(model.device)
    outputs = model.generate(**inputs, max_new_tokens=max_new_tokens)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# ---------------- Flask route ----------------
@app.route("/analyze", methods=["POST"])
def analyze():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    user_description = request.form.get("user_description", "")

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save file temporarily
    temp_path = f"./temp_{file.filename}"
    file.save(temp_path)

    # Extract text
    if file.filename.endswith(".pdf"):
        resume_text = read_pdf(temp_path)
    elif file.filename.endswith(".docx"):
        resume_text = read_docx(temp_path)
    else:
        os.remove(temp_path)
        return jsonify({"error": "Unsupported file format"}), 400

    os.remove(temp_path)  # cleanup

    # ---- Create a detailed prompt ----
    prompt = f"""
    <s>[INST]
    You are an AI Resume Analyzer.
    Analyze the following resume for quality, relevance, and writing.
    Return a structured JSON output with:
    - "status" (Good, Perfect, Bad) and give any other if you want to 
    - "comments" (constructive feedback) along with scope of improvement
    - "ratings" (object with grammar, efficiency, highlights — each out of 10)
    
    Resume Text:
    {resume_text}

    User Description:
    {user_description}
    [/INST]
    """

    # Generate result
    result_text = generate_analysis(prompt)
    print("\n=== MODEL RESPONSE ===\n", result_text, "\n")

    # Return as JSON (even if text)
    return jsonify({"analysis": result_text})

# ---------------- Run ----------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
