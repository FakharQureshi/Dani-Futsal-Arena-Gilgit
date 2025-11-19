import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between rounded-2xl items-center h-16 bg-neutral-800/70 backdrop-blur-md 
                        shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold tracking-wide text-white hover:text-yellow-400 transition-colors duration-200">
          ⚽ Dani Sports Arena
        </h1>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-neutral-300 hover:text-white focus:outline-none transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 px-6 py-2 rounded-xl bg-neutral-800/70 backdrop-blur-md 
                        shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/booking" className="hover:text-yellow-400 transition-colors">Book Slot</Link>
          <Link to="/blog" className="hover:text-yellow-400 transition-colors">Events</Link>
          <Link to="/admin" className="hover:text-yellow-400 transition-colors">Admin</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-3 bg-neutral-900/90 backdrop-blur-md rounded-xl p-4 
                          shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]">
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 transition-colors">Home</Link>
            <Link to="/booking" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 transition-colors">Book Slot</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 transition-colors">Events</Link>
            <Link to="/admin" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 transition-colors">Admin</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
