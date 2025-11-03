import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        default: []
    }],
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }, fullContent: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    }, mediaSrc: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
        default: []
    }]
}, { timestamps: true })

const Blogs = mongoose.model("Blogs", blogsSchema);
export default Blogs;