import { Routes , Route, Router } from 'react-router-dom';
import Home from "../pages/Home.tsx"
import About from "../pages/About.tsx"
import Contact from "../pages/Contact.tsx"
import Blog from "../pages/Blog.tsx"
import Resume_checker from "../pages/Products&Features/Resume_checker.tsx"
import DocumentsPage from "../pages/DocumentsPage.tsx"
import BlogPage from '../pages/Blogpage.tsx';
import AdminPage from '../pages/AdminPage.tsx';
import Features from '../pages/Features.tsx'

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
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Features" element={<Features />} />
      </Routes>
    </div>
  )
}

export default App