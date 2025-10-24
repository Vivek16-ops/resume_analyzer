import React from 'react'

const About = () => {
  const aboutSections = [
    {
      type: "image",
      title: "Our Vision",
      text: "We believe in crafting experiences that go beyond visuals — merging design, functionality, and purpose to create technology that inspires and empowers users globally.",
      src: "/about1.png",
    },
    {
      type: "video",
      title: "Our Mission",
      text: "Our mission is to simplify digital transformation for individuals and businesses through intuitive tools and AI-driven innovation that bring ideas to life effortlessly.",
      src: "/about-video.mp4",
    },
    {
      type: "image",
      title: "Our Team",
      text: "We’re a diverse team of designers, developers, and innovators committed to building solutions that redefine simplicity, performance, and creativity.",
      src: "/about3.png",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-500 via-purple-600 to-blue-700 text-white py-20 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-16 text-center drop-shadow-lg">
        About Us
      </h1>

      <div className="flex flex-col gap-16 w-full max-w-6xl">
        {aboutSections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""
              } items-center gap-8 p-8 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl transition-transform duration-300 hover:scale-[1.02]`}
          >
            {/* Media Section (Image or Video) */}
            <div className="md:w-1/2 w-full flex justify-center">
              {section.type === "image" ? (
                <img
                  src={section.src}
                  alt={section.title}
                  className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg"
                />
              ) : (
                <video
                  src={section.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg"
                />
              )}
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 w-full text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {section.title}
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                {section.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About