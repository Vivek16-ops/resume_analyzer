import { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-black text-white sticky top-0 z-50 ">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <h2 className="text-2xl font-bold tracking-wide cursor-pointer">
                    Logo
                </h2>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-lg font-medium">
                    <li className="cursor-pointer hover:text-gray-400 transition-colors duration-300 ease-in-out hover:scale-110">
                        <Link
                            to="/"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-400 transition-colors">
                        <Link to="/About">
                            About
                        </Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-400 transition-colors">
                        <Link to="/Contact">
                            Contact
                        </Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-400 transition-colors">
                        <Link to="Blog">
                            Blog
                        </Link>
                    </li>
                </ul>

                <div className="flex gap-2">

                    {/* My Documents button (desktop) */}
                    <div className="hidden md:block">
                        <a
                            href="#"
                            className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
                        >
                            My Documents
                        </a>
                    </div>

                     {/* Login Authentication Clerk */}
                    <header>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </header>
                </div>


                {/* Hamburger menu (mobile) */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden focus:outline-none"
                >
                    {/* Simple hamburger icon using divs */}
                    <div className="space-y-1">
                        <span
                            className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""
                                }`}
                        ></span>
                        <span
                            className={`block w-6 h-0.5 bg-white ${menuOpen ? "opacity-0" : ""
                                }`}
                        ></span>
                        <span
                            className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                                }`}
                        ></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-black border-t border-gray-800">
                    <ul className="flex flex-col gap-4 p-5 text-sm font-medium">
                        <li className="cursor-pointer hover:text-gray-400 transition-colors">
                            Home
                        </li>
                        <li className="cursor-pointer hover:text-gray-400 transition-colors">
                            About
                        </li>
                        <li className="cursor-pointer hover:text-gray-400 transition-colors">
                            Contact
                        </li>
                        <li className="cursor-pointer hover:text-gray-400 transition-colors">
                            Blog
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block text-center bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                            >
                                My Documents
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar
