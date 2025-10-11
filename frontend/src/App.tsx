import { Routes , Route } from 'react-router-dom';
import Home from "../pages/Home.tsx"
import About from "../pages/About.tsx"
import Contact from "../pages/Contact.tsx"
import Blog from "../pages/Blog.tsx"

function App() {

  return (
    <div className="min-h-screen">
      {/* Routing Functionality */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Blog" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App