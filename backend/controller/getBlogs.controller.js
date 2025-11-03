import Blogs from "../models/blogs.models.js"
export const getBlogsAPI = async (req, res) => {
    try {
        const blogs = await Blogs.find().populate("authors").populate("mediaSrc");

        return res.json({ success: true, message: "Blogs fetched successfully", data: blogs })
    } catch (error) {
        return res.json({ success: false, message: "Get Blogs API failed", error_message: error.message })
    }
}