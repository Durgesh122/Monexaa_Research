import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaEnvelopeOpenText, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SideActionButtons = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Left Side - Enquiry Now */}
      <Link
        to="/contact-us"
        className={`fixed left-0 top-[40%] -translate-y-1/2 z-[9990] group flex flex-col items-center gap-1 py-2 px-1 bg-gradient-to-b from-blue-600 to-indigo-700 text-white rounded-r-lg shadow-[2px_0_12px_rgba(37,99,235,0.3)] hover:shadow-[2px_0_16px_rgba(37,99,235,0.5)] transition-all duration-300 border-y border-r border-white/20 backdrop-blur-sm ${isOpen ? 'translate-x-0 hover:translate-x-1' : '-translate-x-full'}`}
        aria-label="Enquiry Now"
      >
         <span className="writing-vertical-lr text-[9px] font-bold tracking-wider uppercase text-blue-100 group-hover:text-white transition-colors" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
           Enquiry Now
         </span>
         <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors group-hover:scale-110 duration-300">
            <FaEnvelopeOpenText className="text-xs animate-pulse" />
         </div>
      </Link>

      {/* Left Side - Quick Payment */}
      <Link
        to="/payment"
        className={`fixed left-0 top-[60%] -translate-y-1/2 z-[9990] group flex flex-col items-center gap-1 py-2 px-1 bg-gradient-to-b from-emerald-500 to-teal-700 text-white rounded-r-lg shadow-[2px_0_12px_rgba(16,185,129,0.3)] hover:shadow-[2px_0_16px_rgba(16,185,129,0.5)] transition-all duration-300 border-y border-r border-white/20 backdrop-blur-sm ${isOpen ? 'translate-x-0 hover:translate-x-1' : '-translate-x-full'}`}
        aria-label="Quick Payment"
      >
         <span className="writing-vertical-lr text-[9px] font-bold tracking-wider uppercase text-emerald-100 group-hover:text-white transition-colors" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
           Quick Payment
         </span>
         <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors group-hover:scale-110 duration-300">
            <FaCreditCard className="text-xs animate-pulse" />
         </div>
      </Link>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 top-[72%] -translate-y-1/2 z-[9990] flex items-center justify-center w-5 h-8 bg-gray-800/80 text-white rounded-r-md shadow-md transition-all duration-300 hover:bg-gray-700 backdrop-blur-sm border border-l-0 border-white/20"
        aria-label={isOpen ? "Close side buttons" : "Open side buttons"}
        title={isOpen ? "Hide Buttons" : "Show Buttons"}
      >
        {isOpen ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
      </button>
    </>
  );
};

export default SideActionButtons;
