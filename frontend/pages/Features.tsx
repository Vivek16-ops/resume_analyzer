import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Resume_checker from "./Products&Features/Resume_checker.tsx";

const products = [
  {
    id: 1,
    name: "AI Resume Analyzer",
    description:
      "An advanced AI-powered tool that analyzes resumes to provide insights and improvement suggestions.",
    status: "Launched",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    path: "/Resume_checker",
  },
  {
    id: 2,
    name: "Smart Analytics Dashboard",
    description:
      "An intelligent analytics platform for monitoring user data, engagement, and growth metrics.",
    status: "In Development",
    image:
      "/dashboard.jpg",
    path: "/features/analytics-dashboard",
  },
  {
    id: 3,
    name: "AI-Powered Chatbot",
    description:
      "Our upcoming product to provide automated, context-aware support and lead generation.",
    status: "Coming Soon",
    image:
      "/chatbot.jpg",
    path: "/features/ai-chatbot",
  },
  {
    id: 4,
    name: "Smart Payment System",
    description:
      "A seamless, secure, and fast digital payment solution integrated with multiple APIs.",
    status: "Planned",
    image:
      "/paysystem.avif",
    path: "/features/payment-system",
  },
];

const Features = () => {
  useEffect(() => {
    document.title = "Our Products - MyApp";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff00cc] via-[#7a33cc] to-[#333399] text-white px-6 pt-16 pb-20 flex flex-col items-center">
      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg text-center"
      >
        Our Products & Upcoming Features
      </motion.h1>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full max-w-7xl">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden flex flex-col"
          >
            <Link to={product.path} className="flex flex-col h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 hover:text-pink-300 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full self-start ${
                    product.status === "Launched"
                      ? "bg-green-400/30 text-green-200"
                      : product.status === "In Development"
                      ? "bg-yellow-400/30 text-yellow-200"
                      : "bg-pink-400/30 text-pink-200"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;