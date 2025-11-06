import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";

type resultStruct = {
  email: string,
  document_name: string,
  status: string,
  comments: string,
  ratings: object,
  ats_score: number,
  suggestions:string
};

const Resume_checker = () => {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<resultStruct>();
  const [userDescription, setUserDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  let email: string | any = "";
  let fullName: string | any = "";

  useEffect(() => {
    document.title = "Resume Checker - Resume Analyzer";
    email = user?.primaryEmailAddress?.emailAddress;
  }, [user]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      setSelectedFile(file);
    } else {
      toast.error("Please upload only .pdf or .docx files");
      e.target.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast('Please Attach the file before proceeding further', {
        icon: '📁',
      });
      return;
    }

    if (!userDescription) {
      toast('Please Describe For Whcih Purpose You Want this Resume to be Analyzed', {
        icon: '🤷‍♂️',
      });
      return;
    }

    // Preparing the Form Data
    email = user?.primaryEmailAddress?.emailAddress; // For secondary Safety
    fullName = user?.fullName;
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('email', email);
    formData.append('fullName', fullName);
    formData.append('document_desc', userDescription);

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/fileHandling", {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message)
        const lastestDocument = await fetch("http://localhost:8000/api/getRecentDetail", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email }) // Replace with dynamic email if needed
        });

        const latestDocumentResult = await lastestDocument.json();
        setResult(latestDocumentResult.document)
      }
      else
        toast.error(result.message)
    } catch (error) {
      toast.error('Error while AI API Request')
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden min-h-screen flex justify-center items-center bg-gradient-to-br from-[#ff00cc] via-[#7a33cc] to-[#333399] text-white pt-2 px-6 md:px-12">
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 w-full max-w-6xl">

        {/* Left Section */}
        <div className="left w-full md:w-1/2 flex flex-col justify-center items-start gap-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold">
            Welcome {user?.fullName || "Guest"} 👋
          </h2>

          <p className="text-gray-200 text-lg leading-relaxed">
            “Your resume tells your story — let’s refine it to perfection.
            Upload your document and see how it shines!”
          </p>

          {/* Description Box */}
          <div className="w-full flex flex-col gap-2 mt-4">
            <label htmlFor="userDescription" className="text-gray-200 text-sm font-medium">
              Add a brief description or objective:
            </label>
            <textarea
              id="userDescription"
              value={userDescription}
              onChange={(e) => setUserDescription(e.target.value)}
              rows={4}
              placeholder="E.g. Passionate backend developer seeking impactful projects..."
              className="w-full text-sm text-gray-300 bg-gray-800/70 border border-gray-600 rounded-lg p-3 focus:outline-none resize-none"
            />
          </div>

          {/* Upload Section */}
          <div className="w-full overflow-x-hidden flex flex-col items-center gap-4">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-300 bg-gray-800/70 border border-gray-600 rounded-lg cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-pink-500 file:to-indigo-500 file:text-white hover:file:opacity-90 transition-all"
            />

            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className={`${selectedFile
                ? "bg-gradient-to-r from-pink-500 to-indigo-500 hover:opacity-90"
                : "bg-gray-600 cursor-not-allowed"
                } text-white font-semibold px-6 py-2 rounded-md transition-all`}
            >
              Upload & Analyze
            </button>

            {selectedFile && (
              <p className="text-sm overflow-x-hidden text-gray-300">
                Selected: <span className="text-gray-100">{selectedFile.name}</span>
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="right w-full md:w-1/2 flex flex-col justify-center items-center 
      bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 
      min-h-[400px] text-center relative overflow-hidden"
        >
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-indigo-500/10 blur-3xl" />

          {!isLoading && <h3 className="text-2xl font-semibold mb-4 text-pink-300 relative z-10">
            Resume Analysis Result
          </h3>}

          {result ? (
            <div className="text-gray-100 w-full text-left space-y-6 relative z-10">
              {/* Status */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="font-semibold text-indigo-400">Status:</span>{" "}
                <span className="text-white">{result.status}</span>
              </motion.div>

              {/* Comments */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-semibold text-indigo-400">Comments:</span>
                <ul className="list-disc list-inside mt-2 text-gray-200 space-y-1">
                  {result.suggestions?.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Comments */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-semibold text-indigo-400">suggestions:</span>
                <ul className="list-disc list-inside mt-2 text-gray-200 space-y-1">
                  {result.comments?.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Ratings */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="font-semibold text-indigo-400">Ratings:</span>
                <div className="mt-3 space-y-3">
                  {Object.entries(result.ratings || {}).map(([key, value]) => {
                    const normalized = Math.min(Math.max(value, 0), 10); // clamp between 0–10
                    const percentage = (normalized / 10) * 100;

                    return (
                      <div key={key} className="w-full">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{key}</span>
                          <span className="text-pink-300 font-semibold">{normalized} / 10</span>
                        </div>
                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-pink-400 to-indigo-500 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* ATS Score (Circular Progress Bar) */}
              {result.ats_score !== undefined && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="flex flex-col items-center mt-6"
                >
                  <span className="font-semibold text-indigo-400 mb-3">
                    ATS Score
                  </span>
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="white"
                        strokeWidth="6"
                        className="opacity-20"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray="251"
                        strokeDashoffset={251 - (251 * result.ats_score) / 100}
                        strokeLinecap="round"
                        transition={{ duration: 1 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#ff00cc" />
                          <stop offset="100%" stopColor="#333399" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-pink-300">
                      {result.ats_score}%
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            (!isLoading && <p className="text-gray-300 italic relative z-10">
              Upload your document to view detailed feedback here.
            </p>)
          )}

          {/* Loading Animation  */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col justify-center items-center 
               bg-transparent backdrop-blur-2xl 
               border border-white/10 rounded-2xl 
               z-50 overflow-hidden"
            >
              {/* Subtle rotating ring */}
              <motion.div
                className="relative w-28 h-28 sm:w-36 sm:h-36"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              >
                <div className="absolute inset-0 rounded-full border-[3px] border-transparent 
                      border-t-pink-400 border-r-purple-400 opacity-70" />
                <div className="absolute inset-2 rounded-full border-[3px] border-transparent 
                      border-b-purple-400 border-l-pink-400 opacity-40" />
              </motion.div>

              {/* Simple text */}
              <motion.h2
                className="mt-6 text-base sm:text-lg font-medium text-white/90"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              >
                Analyzing your resume...
              </motion.h2>

              {/* Minimal progress bar */}
              <div className="relative mt-6 w-48 sm:w-60 h-[5px] bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Resume_checker
