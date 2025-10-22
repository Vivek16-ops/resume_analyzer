import User from "../models/users.model.js"
import Documents from "../models/documents.model.js"
import { analyzeResume } from "../utils/AiResponse.js"

export const fileHandlingFunc = async (req, res) => {
    try {
        const file = req.file;
        const info = req.body;

        if (!file) return res.status(400).json({ success: false, message: "No file uploaded" });
        if (!info) return res.json(400).json({ success: true, message: "No user info or anything provided" })

        const { fullName, email, document_desc } = info;

        // Calling the AI Function 
        // const parsedData = await analyzeResume(file, document_desc)

        // For dummy
        const parsedData = {
            success: true,
            message: 'Your resume successfully parseed',
            response: {
                status: 'Perfect',
                comments: [
                    'The resume is well-structured and includes all necessary information such as contact details, technical skills, projects, education, achievements, and publications.',
                    'The candidate has a good balance of front-end and back-end skills.',
                    'The projects section is solid, providing clear descriptions of responsibilities and used technologies.',
                    "The achievements section effectively highlights the candidate's accomplishments.",
                    "The education section is detailed and showcases the candidate's academic background effectively.",
                    "However, there is a lack of a professional summary or objective statement that gives an overview of the candidate's career goal or professional experience.",
                    'Additionally, there is no mention of previous work experience or internships, which can be a disadvantage if the candidate has any.',
                    'The candidate could improve the resume by tailoring it more towards the specific job they are applying for, highlighting relevant skills and experiences.'
                ],
                ratings: { grammar: 10, efficiency: 9, highlights: 8, relevance: 8 }
            }
        }

        // Dynamically fectched the ratings
        const ratingsMap = new Map();
        for (const [key, value] of Object.entries(parsedData.response.ratings)) {
            ratingsMap.set(key, value);
        }

        // Save the user info and file info to database
        const newDoc = await Documents.create({
            email,
            document_name: file.originalname,
            status: parsedData.response.status || "Good",
            comments: parsedData.response.comments.join('\n'),
            ratings: ratingsMap
        })

        // Link Document to user
        let user = await User.findOne({ email });
        if (user) {
            user.documents.push(newDoc._id);
            await user.save();
        } else {
            user = await User.create({
                fullName,
                email,
                documents: [newDoc._id]
            })
        }

        return res.status(200).json({ success: true, message: "AI Resume Analysis Done" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}