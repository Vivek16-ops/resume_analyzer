import React, { useState } from 'react'

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  query: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phone: "",
    email: "",
    query: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit form and call API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Example API endpoint (replace with your actual backend endpoint)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Your query has been sent successfully!");
        setFormData({ fullName: "", phone: "", email: "", query: "" });
      } else {
        setMessage("❌ Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-500 via-purple-600 to-blue-700 text-white py-20 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-16 text-center drop-shadow-lg">
        Contact Us
      </h1>

      <div className="w-full max-w-4xl flex flex-col items-center gap-12">
        {/* Contact Form */}
        <div className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-lg font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-lg font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Query Description */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Query Description
              </label>
              <textarea
                name="query"
                value={formData.query}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your query..."
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold shadow-lg transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                  }`}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <p className="text-center text-gray-200 mt-4">{message}</p>
            )}
          </form>
        </div>

        {/* Contact Info Glass Card */}
        <div className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-2xl font-bold">Need Help?</h3>
            <p className="text-gray-200">
              Feel free to reach out to our support team anytime!
            </p>
          </div>

          <div className="space-y-2 text-center md:text-right">
            <p>
              📧 <span className="font-semibold">support@yourdomain.com</span>
            </p>
            <p>
              📞 <span className="font-semibold">+91 98765 43210</span>
            </p>
            <p>🏢 221B Innovation Street, Tech City, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact
