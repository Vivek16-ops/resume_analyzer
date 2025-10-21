import { useState } from "react";

const FrequentlyAsked = () => {
    const faqs = [
        {
            question: "How does the AI resume checker work?",
            answer:
                "Our system uses advanced AI models to scan your resume for formatting, keywords, and structure. It provides actionable feedback on how to make it more ATS-friendly and job-specific.",
        },
        {
            question: "Is my uploaded data safe?",
            answer:
                "Absolutely. Your resumes and personal data are encrypted and never stored permanently. We use secure connections and comply with strict privacy policies.",
        },
        {
            question: "Can I use the tool for multiple resumes?",
            answer:
                "Yes, you can analyze and optimize multiple resumes for different job roles to improve your chances of landing interviews.",
        },
        {
            question: "Does the checker support PDF and DOCX files?",
            answer:
                "Yes! You can upload both PDF and DOCX files. The tool automatically extracts your text for AI-powered analysis and suggestions.",
        },
        {
            question: "What kind of feedback will I get?",
            answer:
                "You'll receive a detailed score with suggestions for grammar, structure, skills, keywords, and design improvements tailored to your resume.",
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="relative py-20 px-6 lg:px-16 bg-transparent overflow-hidden">
            {/* Soft translucent overlay matching body gradient */}
            <div className="absolute inset-0 bg-transparent backdrop-blur-3xl pointer-events-none"></div>

            <div className="relative max-w-5xl mx-auto text-white bg-transparent">
                {/* Section header */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Everything you need to know about our AI-powered resume analyzer and
                        how it can help you stand out from the crowd.
                    </p>
                </div>

                {/* FAQ Cards */}
                <div className="space-y-5">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-2xl border border-white/20 
            rounded-2xl p-5 md:p-6 transition-all duration-300 
            hover:border-[#ff00cc]/60 hover:shadow-[0_0_25px_rgba(255,0,204,0.3)]
            hover:scale-[1.02]"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className="flex justify-between items-center w-full text-left"
                            >
                                <span className="font-semibold text-lg">{faq.question}</span>
                                <span
                                    className={`transition-transform duration-300 text-pink-300 ${openIndex === index ? "rotate-180" : "rotate-0"
                                        }`}
                                >
                                    ▼
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index
                                        ? "max-h-40 opacity-100 mt-3"
                                        : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-white/80">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FrequentlyAsked
