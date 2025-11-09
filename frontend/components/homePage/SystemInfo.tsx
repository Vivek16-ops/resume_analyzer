import { motion } from "framer-motion";

const SystemInfo = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 space-y-10 lg:space-y-0 text-white">
      {/* Background glass & glow */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl -z-10"></div>

      {/* Subtle animated gradient lines */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            d="M0,200 C480,300 960,100 1440,220"
          ></path>
        </svg>
      </div>

      {/* Left Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex justify-center"
      >
        <img
          src="homeImage.jpg"
          alt="Company AI System Illustration"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      {/* Right Section – Company Info */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col space-y-6"
      >
        <h2 className="text-3xl lg:text-4xl font-bold drop-shadow-lg leading-snug">
          Empowering Innovation with Scalable AI Systems
        </h2>

        <p className="text-white/80 leading-relaxed">
          At <span className="text-green-400 font-semibold">DevVitals</span>, we
          specialize in crafting intelligent, scalable, and secure AI-driven
          platforms. Our systems seamlessly blend automation with human
          creativity — enabling businesses to make faster, smarter, and more
          impactful decisions.
        </p>

        <p className="text-white/80 leading-relaxed">
          From data-driven insights to enterprise-grade web ecosystems, we
          design technology that grows with your business. Our architecture
          emphasizes performance, modularity, and sustainability — ensuring
          long-term success for every product we build.
        </p>

        {/* Two Key Pillars */}
        <div className="space-y-8 mt-6">
          <div className="flex items-start space-x-4">
            <div className="bg-green-400/80 text-white font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-md backdrop-blur-sm text-lg">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Smart Infrastructure
              </h3>
              <p className="text-white/80 leading-relaxed">
                Our AI infrastructure is built on scalable cloud environments,
                combining real-time analytics and automation to streamline
                operations across multiple industries.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-400/80 text-white font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-md backdrop-blur-sm text-lg">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Human-Centered Innovation
              </h3>
              <p className="text-white/80 leading-relaxed">
                We design every system with empathy — combining AI precision
                with user-focused experiences that enhance engagement and
                usability.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-10 bg-green-400/10 border border-green-400/30 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-green-400/20 transition-all"
        >
          <p className="text-white/90 font-medium text-center">
            🚀 We’re redefining how modern businesses harness technology —
            building systems that don’t just work, but evolve.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SystemInfo;
