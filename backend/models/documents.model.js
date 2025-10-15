import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    document_name: {
        type: String,
        required: true,
        default: "Upload resume"
    }, status: {
        type: String,
        required: true,
        default: "Good"
    }
}, { timestamps: true })

const Documents = mongoose.model("Documents", documentSchema);
export default Documents;