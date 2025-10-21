const SystemInfo = () => {

   return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 lg:px-12 py-20 space-y-10 lg:space-y-0">
      {/* Glass effect container */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-lg -z-10"></div>

      {/* Left Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src="sysInfo.png"
          alt="Resume Checker Illustration"
          className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
        />
      </div>

      {/* Right Text */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-white">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          Enhancv’s Resume Checker forms its ATS score with a two-tier system
        </h2>

        <p className="text-white/80 leading-relaxed">
          When you’re applying for a job, there’s a high chance your resume will be screened through an applicant tracking system before reaching a recruiter. 
          ATS helps hiring managers find the right candidates by searching for keywords and adding resumes to a database.
        </p>

        <p className="text-white/80 leading-relaxed">
          That’s why the success of your resume depends on how optimized it is for the job you’re applying for, 
          the template you’re using, and the skills and keywords included.
        </p>

        {/* Two Points */}
        <div className="space-y-8 mt-6">
          <div className="flex items-start space-x-4">
            <div className="bg-green-400/80 text-white font-semibold rounded-full h-8 w-8 flex items-center justify-center shadow-md backdrop-blur-sm">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                The proportion of content we can interpret
              </h3>
              <p className="text-white/80 leading-relaxed">
                Similar to an ATS, we analyze and attempt to comprehend your resume. 
                The better we understand it, the more effectively it aligns with a company’s ATS.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-400/80 text-white font-semibold rounded-full h-8 w-8 flex items-center justify-center shadow-md backdrop-blur-sm">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                What our checker identifies
              </h3>
              <p className="text-white/80 leading-relaxed">
                Although an ATS doesn’t check spelling or phrasing, recruiters do. 
                Our second-tier score evaluates your achievements and the quality of your written content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SystemInfo
