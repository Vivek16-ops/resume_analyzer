import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const BlogDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const blog = location.state; // blog data passed from Blog page

    // Converting Buffer into Base64 for Image and Video Rendering 
    const bufferToBase64 = (buffer: number[]) => {
        const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
        return btoa(binary);
    };

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ff00cc] via-[#7a33cc] to-[#333399] text-white relative overflow-hidden">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_50%)] animate-pulse" />

                {/* Floating gradient text */}
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 animate-pulse drop-shadow-lg">
                    Blog Not Found
                </h2>

                <p className="text-gray-200 text-center mb-8 text-sm md:text-base max-w-md">
                    Oops! The blog you’re looking for might have been removed or never existed.
                </p>

                {/* Frosted glass button */}
                <button
                    onClick={() => navigate("/Blog")}
                    className="backdrop-blur-lg bg-white/20 hover:bg-white/30 transition-all duration-300 ease-in-out px-8 py-3 rounded-2xl text-lg font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                    🔙 Back to Blogs
                </button>

                {/* Subtle floating animation */}
                <div className="absolute bottom-10 text-sm text-gray-300 animate-bounce">
                    ✨ Keep exploring amazing stories ✨
                </div>
            </div>

        );
    }

    useEffect(() => {
        document.title = `${blog.title} - Resume Analyzer`;
    }, [blog.title]);

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#ff00cc] via-[#7a33cc] to-[#333399] text-white px-6 py-16 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/20"
            >

                {blog.mediaSrc?.[0]?.data ? (
                    blog.mediaType === "image" ? (
                        <img
                            src={`data:${blog.mediaSrc[0].contentType};base64,${bufferToBase64(
                                blog.mediaSrc[0].data.data
                            )}`}
                            alt={blog.title}
                            className="w-full h-80 object-cover rounded-xl mb-8"
                        />
                    ) : (
                        <video
                            src={`data:${blog.mediaSrc[0].contentType};base64,${bufferToBase64(
                                blog.mediaSrc[0].data.data
                            )}`}
                            className="w-full h-80 object-cover rounded-xl mb-8"
                            autoPlay
                            muted
                            loop
                        />
                    )
                ) : (
                    <p>No media available</p>
                )}

                {/* /To-do :- Design This Full Content in such a way that it automatically detect heading , sub-headings , paragraphs and codes section also adjust multiImage Functionality */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>
                <p className="text-gray-200 leading-relaxed text-lg">
                    {blog.fullContent}
                </p>

                <button
                    onClick={() => navigate("/Blog")}
                    className="mt-10 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-6 rounded-lg backdrop-blur-md transition"
                >
                    ← Back to Blogs
                </button>
            </motion.div>
        </div>
    );
};

export default BlogDetail;
