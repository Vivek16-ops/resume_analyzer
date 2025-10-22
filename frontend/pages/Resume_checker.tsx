import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type resultStruct = {
  email: string,
  document_name: string,
  status: string,
  comments: string,
  ratings: object
};

const Resume_checker = () => {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<resultStruct>();
  const [userDescription, setUserDescription] = useState("")
  let email: string | any = "";
  let fullName: string | any = "";

  useEffect(() => {
    email = user?.primaryEmailAddress?.emailAddress;
  }, [user]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      setSelectedFile(file);
    } else {
      alert("Please upload only .pdf or .docx files");
      e.target.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a file before uploading");
      return;
    }

    if (!userDescription) {
      alert("Please Describe for which purpose you want these resume to be analyzed")
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
        
        const laestDocumentResult = await lastestDocument.json();
        console.log(typeof(laestDocumentResult.document))
        setResult(laestDocumentResult.document)
      }
      else
        toast.error(result.message)
    } catch (error) {
      toast.error('Error while AI API Request')
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
          <div className="w-full flex flex-col items-center gap-4">
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
              <p className="text-sm text-gray-300">
                Selected: <span className="text-gray-100">{selectedFile.name}</span>
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="right w-full md:w-1/2 flex flex-col justify-center items-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 min-h-[350px] text-center">
          <h3 className="text-xl font-semibold mb-3 text-pink-300">
            Resume Analysis Result
          </h3>

          {result ? (
            <div className="text-gray-100 w-full text-left space-y-4">
              {/* Status */}
              <div>
                <span className="font-semibold text-indigo-400">Status:</span>{" "}
                <span className="text-white">{result.status}</span>
              </div>

              {/* Comments */}
              <div>
                <span className="font-semibold text-indigo-400">Comments:</span>
                <ul className="list-disc list-inside mt-2 text-gray-200 space-y-1">
                  {result.comments?.split('\n').map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>

              {/* Ratings */}
              <div>
                <span className="font-semibold text-indigo-400">Ratings:</span>
                <ul className="list-none mt-2 text-gray-200 space-y-1">
                  {Object.entries(result.ratings || {}).map(([key, value]) => (
                    <li key={key}>
                      <span className="capitalize">{key}:</span>{" "}
                      <span className="text-pink-300 font-semibold">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-gray-300 italic">
              Upload your document to view detailed feedback here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resume_checker
