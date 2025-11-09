import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🧠",
      title: "AI Resume Analyzer",
      description:
        "Leverages deep learning to evaluate resumes for structure, tone, and job-fit accuracy.",
      points: ["ATS Scoring", "Grammar & Content Feedback", "Skill Matching"],
      path: "/Resume_checker",
    },
    {
      icon: "📊",
      title: "Smart Dashboard Insights",
      description:
        "Dynamic dashboards that visualize complex business data in seconds using AI analytics.",
      points: ["Real-time Reports", "Custom Visualization", "Predictive Metrics"],
      path: "/dashboard-ai",
    },
    {
      icon: "🎨",
      title: "DesignGen Studio",
      description:
        "Create stunning UI/UX layouts instantly using AI-assisted design suggestions.",
      points: ["Auto Color Palette", "Layout Recommendations", "Typography Generator"],
      path: "/designgen",
    },
    {
      icon: "🤖",
      title: "ChatOps Automation",
      description:
        "Streamline workflows and automate repetitive tasks with conversational AI bots.",
      points: ["Slack & Discord Integration", "Custom Workflows", "Multi-language Support"],
      path: "/chatops",
    },
    {
      icon: "🔒",
      title: "AI Security Guard",
      description:
        "Protect digital products with AI-driven anomaly detection and real-time alerts.",
      points: ["Threat Prediction", "Real-time Monitoring", "Auto Recovery"],
      path: "/ai-security",
    },
  ];

  return (
    <section className="relative mt-4 md:mt-16 overflow-hidden py-20 px-6 lg:px-16 text-white">
      {/* Gradient and glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-pink-600/20 to-blue-600/30 backdrop-blur-2xl"></div>

      {/* Decorative wave accent */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            d="M0,160 C480,300 960,20 1440,180"
          ></path>
        </svg>
      </div>

      {/* Section Content */}
      <motion.div
        className="relative max-w-7xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <motion.h2
            className="text-3xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            viewport={{ once: true }}
          >
            Innovative Software Solutions by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              DevVitals
            </span>
          </motion.h2>
          <motion.p
            className="text-white/80 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            We’re a passionate team of developers, designers, and innovators crafting intelligent
            tools that redefine how humans and technology collaborate.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-6 hover:scale-[1.03] transition-all duration-300 hover:bg-white/20"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-pink-500/40 to-purple-500/40 flex items-center justify-center rounded-full text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>

              <p className="text-white/80 mb-3">{feature.description}</p>

              <ul className="space-y-1 text-sm text-white/70 mb-5">
                {feature.points.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>

              <Link
                to={feature.path}
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:from-pink-400 hover:to-purple-500 transition-all duration-300 shadow-md group-hover:shadow-pink-400/40"
              >
                Explore →
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
