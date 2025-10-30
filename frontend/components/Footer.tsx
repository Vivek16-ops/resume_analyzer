const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-white/5 border-t border-white/10 text-white text-center py-6 mt-2 overflow-x-hidden">
      <p className="text-base opacity-90">
        © {new Date().getFullYear()} <span className="font-semibold">Resume Analyzer</span> · Built with ❤️ by Vivek Raj
      </p>
      <div className="mt-3 flex justify-center space-x-5 text-sm opacity-80">
        <a href="#privacy" className="hover:opacity-100 transition">Privacy Policy</a>
        <span>•</span>
        <a href="#terms" className="hover:opacity-100 transition">Terms</a>
        <span>•</span>
        <a href="#contact" className="hover:opacity-100 transition">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
