import OpenAI from "openai";
import mammoth from "mammoth";
import pdf from "pdf-parse-debugging-disabled";

// Helper function to extract pdf and docs
export async function extractTextFromFile(file) {
    if (!file || !file.buffer || !file.originalname) {
        throw new Error("Invalid file input: missing buffer or filename");
    }

    const fileType = file.originalname.split('.').pop().toLowerCase();

    if (fileType === "docx") {
        const { value } = await mammoth.extractRawText({ buffer: file.buffer });
        return value;
    }

    if (fileType === "pdf") {
        const data = await pdf(file.buffer);
        return data.text;
    }

    throw new Error("Unsupported file format");
}


export async function analyzeResume(file, user_description = "") {
    try {
        const resumeText = await extractTextFromFile(file);

        const prompt = `
        You are an AI Resume Analyzer.
        Analyze the following resume for quality, relevance, writing and others also.
        Return a structured JSON output with:
        - "status" (Good, Perfect, Bad or others type of status will also be fine based on analysis)
        - "comments" (constructive feedback only) it should be arr only with bullet points
        - "suggestions" (improvements to be made) it should be arr only with bullet points 
        - "ratings" (object with grammar, efficiency, highlights — each out of 10, and add as many of others parameters as required)
        - ats_score (score after analyzing the resume and this should be out of 100)
    
        Resume Text:
        ${resumeText}
    
        User Description:
        ${user_description}
        `;

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API });

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const rawText = response.choices[0].message.content;

        const jsonStart = rawText.indexOf("{");
        const jsonEnd = rawText.lastIndexOf("}");
        const jsonString = rawText.slice(jsonStart, jsonEnd + 1);

        const parsed = JSON.parse(jsonString);
        return { success: true, message: "Your resume successfully parseed", response: parsed };
    } catch (error) {
        console.error("Failed to parse JSON. Raw output returned.");
        return { success: false, message: error.message };
    }
}