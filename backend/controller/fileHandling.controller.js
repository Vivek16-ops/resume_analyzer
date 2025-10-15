import User from "../models/users.model.js"
import Documents from "../models/documents.model.js"

export const fileHandlingFunc = async (req, res) => {
    try {
        const file = req.file;
        const info = req.body;

        if (!file) return res.status(400).json({ success: false, message: "No file uploaded" });
        if (!info) return res.json(400).json({ success: true, message: "No user info or anything provided" })
        
        // Calling python AI API (with file) and fetch the response 
        

        const { fullName, email , document_desc } = info;

        // Save the user info and file info to database
        const newDoc = await Documents.create({
            email,
            document_name:file.originalname,
            status: info.status || "Good"
        })

        // Link Document to user
        let user = await User.findOne({email});
        if(user)
        {
            user.documents.push(newDoc._id);
            await user.save();
        }else
        {
            user = await User.create({
                fullName,
                email,
                documents:[newDoc._id]
            })
        }

        return res.status(200).json({ success: true, message: "Successfully Recieving file from the frontend" })
    } catch (error) {
        return res.json({ success: false, message: "Some error arises in recieving file", error_message: error.message })
    }
}