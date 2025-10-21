const FeaturesSection = () => {
    return (
        <section className="relative mt-1 md:mt-20 overflow-hidden py-24 px-6 lg:px-16 text-white">
            {/* Soft translucent background with blur */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl"></div>

            {/* Optional flowing lines accent */}
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

            {/* Section content with glass effect */}
            <div className="relative max-w-7xl mx-auto bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                        Our AI-powered resume checker goes beyond typos and punctuation
                    </h2>
                    <p className="text-white/80 max-w-3xl mx-auto">
                        We’ve built-in ChatGPT to help you create a resume that’s tailored to the position you’re applying for.
                    </p>
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column */}
                    <div className="flex flex-col justify-center space-y-4 lg:col-span-1">
                        <h3 className="text-2xl font-semibold">Resume optimization checklist</h3>
                        <p className="text-white/80">
                            We check for 16 crucial things across 5 different categories on your resume including content,
                            file type, and keywords in the most important sections of your resume.
                            Here’s a full list of the checks you’ll receive:
                        </p>
                    </div>

                    {/* Right grid of cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Cards */}
                        {[
                            {
                                icon: "📄",
                                title: "Format",
                                items: [
                                    "✅ File format and size",
                                    "✅ Resume length",
                                    "✅ Long bullet points with suggestions on how to shorten"
                                ]
                            },
                            {
                                icon: "🧩",
                                title: "Resume sections",
                                items: [
                                    "✅ Contact information",
                                    "✅ Essential sections",
                                    "✅ Personality showcase with tips on how to improve"
                                ]
                            },
                            {
                                icon: "✏️",
                                title: "Content",
                                items: [
                                    "✅ ATS parse rate",
                                    "✅ Repetition of words and phrases",
                                    "✅ Spelling and grammar",
                                    "✅ Quantifying impact in experience section"
                                ]
                            },
                            {
                                icon: "💡",
                                title: "Skills suggestion",
                                items: ["✅ Hard skills", "✅ Soft skills"]
                            },
                            {
                                icon: "🅰️",
                                title: "Style",
                                items: [
                                    "✅ Resume design",
                                    "✅ Email address",
                                    "✅ Usage of active voice",
                                    "✅ Avoidance of buzzwords and clichés"
                                ],
                                span: true
                            }
                        ].map((card, index) => (
                            <div
                                key={index}
                                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:scale-[1.02] transition-transform duration-300 ${card.span ? "sm:col-span-2" : ""
                                    }`}
                            >
                                <div className="flex items-center mb-3">
                                    <div className="h-10 w-10 bg-green-400/30 flex items-center justify-center rounded-full text-2xl">
                                        {card.icon}
                                    </div>
                                    <h4 className="ml-3 font-semibold text-xl">{card.title}</h4>
                                </div>
                                <ul className="space-y-1 text-white/80">
                                    {card.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default FeaturesSection
