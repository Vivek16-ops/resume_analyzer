const PromoSection = () => {
    return (
        <div className="mt-16 grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                <h3 className="text-xl font-semibold text-pink-300 mb-3">AI-Powered Analysis</h3>
                <p className="text-gray-200 text-sm">
                    Our intelligent system evaluates structure, grammar, and relevance using cutting-edge AI models.
                </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                <h3 className="text-xl font-semibold text-pink-300 mb-3">ATS Optimization</h3>
                <p className="text-gray-200 text-sm">
                    Get a detailed ATS compatibility score to improve your chances of passing recruiter screenings.
                </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                <h3 className="text-xl font-semibold text-pink-300 mb-3">Personalized Feedback</h3>
                <p className="text-gray-200 text-sm">
                    Receive actionable suggestions to make your resume stand out among thousands of applicants.
                </p>
            </div>
        </div>
    );
}

export default PromoSection
