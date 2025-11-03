import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';

type BlogType = {
  _id: string;
  title: string;
  description: string;
  fullContent: string;
  mediaType: "image" | "video";
  mediaSrc: {
    _id: string;
    name?: string;
    contentType: string;
    data: {
      type: string;
      data: number[];
    };
    base64?: string;
  }[];
  authors: {
    _id: string;
    fullName: string;
    email?: string;
    isAdmin?: boolean;
  }[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  // Converting Buffer into Base64 for Image and Video Rendering 
  const bufferToBase64 = (buffer: number[]) => {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
    return btoa(binary);
  };


  // Fetch Blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/getBlogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (result.success) {
          setBlogs(result.data);
        }
      } catch (error) {
        toast.error("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ff00cc] via-[#7a33cc] to-[#333399] text-white px-4">
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-xl sm:text-2xl font-semibold tracking-wide animate-pulse">
            Loading Blogs...
          </p>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            Please wait while we fetching the latest insights for you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff00cc] via-[#7a33cc] to-[#333399] text-white px-4 sm:px-6 md:px-10 py-16 flex flex-col items-center">
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg text-center">
        Our Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-7xl">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden border border-white/20 transition-all 
                   flex flex-col h-full mx-auto w-full max-w-[380px] sm:max-w-none"
          >
            {/* Media Section */}
            {blog.mediaSrc?.[0]?.data ? (
              blog.mediaType === "image" ? (
                <img
                  src={`data:${blog.mediaSrc[0].contentType};base64,${bufferToBase64(
                    blog.mediaSrc[0].data.data
                  )}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video loop muted autoPlay className="w-full h-48 object-cover">
                  <source
                    src={`data:${blog.mediaSrc[0].contentType};base64,${bufferToBase64(
                      blog.mediaSrc[0].data.data
                    )}`}
                    type={blog.mediaSrc[0].contentType}
                  />
                </video>
              )
            ) : (
              <p className="text-center text-gray-300 p-6">No media available</p>
            )}

            {/* Content */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-2xl font-semibold mb-2 leading-snug">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-200 leading-relaxed mb-3 line-clamp-3">
                  {blog.description}
                </p>
                {blog.authors?.length > 0 && (
                  <p className="text-xs text-gray-300">
                    By{" "}
                    <span className="font-medium">
                      {blog.authors.map((author) => author.fullName).join(", ")}
                    </span>
                  </p>
                )}

              </div>

              <button
                onClick={() => navigate(`/Blog/${blog._id}`, { state: blog })}
                className="mt-5 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg backdrop-blur-md transition w-fit self-start"
              >
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
