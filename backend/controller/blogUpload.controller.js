import Media from "../models/media.models.js";
import Blogs from "../models/blogs.models.js";
import User from "../models/users.model.js";

export const blogUploadAPIController = async (req, res) => {
    try {
        const mediaFile = await req.file;
        const info = await req.body;

        const { userEmail, title, description, fullContent, mediaType } = info;

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found! Please check the email provided." });
        }

        if (!user.isAdmin) {
           return res.status(403).json({ success: false, message: "Access denied! You do not have permission to upload blogs." });
        }

        // Saving the media file first to database
        const media = await Media.create({
            name: mediaFile.originalname,
            contentType: mediaFile.mimetype,
            data: mediaFile.buffer,
        })

        // Now saving the blog details
        let blog = await Blogs.findOne({ title });
        if (blog) {
            blog.authors.push(user._id);
            blog.mediaSrc.push(media._id);
            await blog.save();
        } else {
            const blogs = await Blogs.create({
                authors: [user._id],
                title,
                description,
                fullContent,
                mediaType,
                mediaSrc: [media._id]
            })
        }

        return res.json({ success: true, message: "Congratulations on your blog upload!" })
    } catch (error) {
        return res.json({ success: false, message: "Blog Upload API failed", error_message: error.message })
    }
}