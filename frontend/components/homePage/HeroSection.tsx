import { useNavigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';

const HeroSection = () => {

  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleUploadResumeClick = () => {
    if (isSignedIn)
      navigate("/Resume_checker")
    else {
      toast('Please Sign In', {
        icon: '👏',
      });
    }
  }

  return (
    <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 lg:py-24 text-white">

      <Toaster
        position="top-center"
        reverseOrder={true}
      />

      {/* Left content */}
      <div className="w-full lg:w-1/2 space-y-6">
        <p className="text-sm font-semibold text-pink-300 uppercase tracking-wide">
          Resume Checker
        </p>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Is your resume good enough?
        </h1>

        <p className="text-gray-200 text-lg max-w-md">
          A free and fast AI resume checker doing 16 crucial checks to ensure your
          resume is ready to perform and get you interview callbacks.
        </p>

        {/* Upload box */}
        <div className="border border-dashed border-gray-300/50 rounded-xl p-6 max-w-md bg-white/10 backdrop-blur-md shadow-sm hover:shadow-lg transition-shadow duration-300">
          <p className="text-center text-gray-200 text-sm mb-4">
            Drop your resume here or choose a file.<br />
            <span className="text-xs text-gray-300">
              PDF & DOCX only. Max 2MB file size.
            </span>
          </p>

          <div className="flex justify-center">
            <button onClick={handleUploadResumeClick} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200">
              Upload Your Resume
            </button>
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
            Privacy guaranteed
          </p>
        </div>
      </div>

      {/* Right image */}
      <div className="relative w-full lg:w-1/2 mb-10 lg:mb-0 flex justify-center lg:justify-end">
        {/* Background circles */}
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="absolute w-72 h-72 bg-gradient-to-tr from-pink-400/50 to-purple-500/50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-gradient-to-bl from-indigo-400/30 to-pink-500/30 rounded-full blur-2xl rotate-45"></div>
          <div className="absolute w-80 h-80 bg-gradient-to-br from-yellow-300/20 to-indigo-400/20 rounded-full blur-xl -translate-x-10 translate-y-5"></div>
        </div>

        <img
          src="/home_image.webp"
          alt="Resume Preview"
          className="w-full max-w-md lg:max-w-lg drop-shadow-2xl rounded-2xl"
        />
      </div>

    </section>
  );
}

export default HeroSection