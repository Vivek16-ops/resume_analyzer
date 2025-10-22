import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    document_name: {
        type: String,
        require: true,
        default: "upload resume"
    },
    status: {
        type: String,
        required: true,
        default: "Good"
    },
    ats_score:{
        type:Number,
        required:true,
        default:50
    },
    comments: {
        type: String,
        default: "Your resume comments"
    }, ratings: {
        type: Map,
        of: Number // allows dynamic keys like creativity, clarity, etc.
    }
}, { timestamps: true })

const Documents = mongoose.model("Documents", documentSchema);
export default Documents;