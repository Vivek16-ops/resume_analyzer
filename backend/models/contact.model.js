import mongoose from "mongoose";

const contactSchmema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: [String],
        default: []
    },
    query: {
        type: [String],
        default: []
    }
    
}, { timestamps: true })

const Documents = mongoose.model("ContactForm", contactSchmema);
export default Documents;