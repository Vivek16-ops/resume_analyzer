import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleExploreProducts = () => {
    if (isSignedIn) navigate("/features");
    else {
      toast("Please Sign In to explore our products", {
        icon: "🚀",
      });
    }
  };

  return (
    <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 lg:py-24 text-white overflow-hidden">
      <Toaster position="top-center" reverseOrder={true} />

      {/* Left content */}
      <motion.div
        className="w-full lg:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.p
          className="text-sm font-semibold text-pink-300 uppercase tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Welcome to DevVitals
        </motion.p>

        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Building the Future of Intelligent Software
        </motion.h1>

        <motion.p
          className="text-gray-200 text-lg max-w-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          At{" "}
          <span className="font-semibold text-pink-300">DevVitals</span>, we craft cutting-edge AI
          tools and digital products — from resume analyzers to smart dashboards and automation
          systems. Empowering developers, creators, and businesses to achieve more with technology.
        </motion.p>

        {/* Explore Products box */}
        <motion.div
          className="border border-dashed border-gray-300/50 rounded-xl p-6 max-w-md bg-white/10 backdrop-blur-md shadow-sm hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-center text-gray-200 text-sm mb-4">
            Discover our range of innovative products that redefine the digital experience.
          </p>

          <div className="flex justify-center">
            <motion.button
              onClick={handleExploreProducts}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-md hover:from-pink-600 hover:to-purple-600 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Products
            </motion.button>
          </div>

          <p className="text-center text-xs text-gray-300 mt-3 flex justify-center items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15.75v-7.5m0 0l3 3m-3-3l-3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Trusted by creators worldwide
          </p>
        </motion.div>
      </motion.div>

      {/* Right image & effects */}
      <motion.div
        className="relative w-full lg:w-1/2 mb-10 lg:mb-0 flex justify-center lg:justify-end"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Background circles */}
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="absolute w-72 h-72 bg-gradient-to-tr from-pink-400/50 to-purple-500/50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-gradient-to-bl from-indigo-400/30 to-pink-500/30 rounded-full blur-2xl rotate-45"></div>
          <div className="absolute w-80 h-80 bg-gradient-to-br from-yellow-300/20 to-indigo-400/20 rounded-full blur-xl -translate-x-10 translate-y-5"></div>
        </div>

        {/* Floating Image */}
        <motion.img
          src="/homeProduct.png"
          alt="DevVitals Products"
          className="w-full max-w-md lg:max-w-lg drop-shadow-2xl rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            // entrance/default transition
            default: { delay: 0.3, duration: 0.8, ease: "easeOut" },
            // y-axis continuous floating animation
            y: { repeat: Infinity, repeatType: "mirror", duration: 6, ease: "easeInOut" },
          }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
