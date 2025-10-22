import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx'
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'

// Clerk Publisher key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Some Issue Occurs in Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter >
        <Navbar></Navbar>
        <App />
        <Footer></Footer>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
