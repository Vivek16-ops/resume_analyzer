import { Routes , Route } from 'react-router-dom';
import Home from "../pages/Home.tsx"
import About from "../pages/About.tsx"
import Contact from "../pages/Contact.tsx"
import Blog from "../pages/Blog.tsx"
import Resume_checker from "../pages/Resume_checker.tsx"
import DocumentsPage from "../pages/DocumentsPage.tsx"
import BlogPage from '../pages/Blogpage.tsx';

function App() {

  return (
    <div className="min-h-screen">
      {/* Routing Functionality */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Blog/:id" element={<BlogPage />} />
        <Route path="/Resume_checker" element={<Resume_checker />} />
        <Route path="/DocumentsPage" element={<DocumentsPage />} />
      </Routes>
    </div>
  )
}

export default App