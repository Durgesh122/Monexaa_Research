import React, { useState } from 'react';
import { FaPlus, FaUniversalAccess, FaWhatsapp, FaPhone, FaVolumeUp, FaCommentDots, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-2 md:right-6 z-[9999] flex flex-col items-center gap-2">
      
      {/* Main Buttons Container */}
      <div className={`flex flex-col items-center transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
        {/* Accessibility Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mb-3"
            >
              <Link
                to="/accessibility-statement"
                className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300"
                title="Accessibility"
                aria-label="Accessibility"
              >
                <FaUniversalAccess className="text-lg md:text-xl" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plus Button with Expandable Menu */}
        <div 
          className="relative flex flex-col items-center"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="absolute bottom-full pb-3 flex flex-col gap-3 items-center"
              >
                {/* Playful Chatbot Button */}
                <motion.button 
                  animate={{ 
                    rotate: [0, -15, 15, -15, 15, 0],
                    y: [0, -6, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                  className="w-8 h-8 md:w-10 md:h-10 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-pink-600"
                  title="Chat with AI"
                  onClick={() => alert("Natkhat Chatbot coming soon!")}
                >
                  <FaCommentDots className="text-sm md:text-base" />
                </motion.button>

                <button 
                  className="w-8 h-8 md:w-10 md:h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-indigo-600 hover:scale-110 transition-all"
                  title="Text to Speech"
                  onClick={() => {
                    if ('speechSynthesis' in window) {
                       const utterance = new SpeechSynthesisUtterance("Welcome to Monexaa Research");
                       window.speechSynthesis.speak(utterance);
                    }
                  }}
                >
                  <FaVolumeUp className="text-sm md:text-base" />
                </button>
                <a 
                  href="https://wa.me/6232678136" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-10 md:h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-green-600 hover:scale-110 transition-all"
                  title="WhatsApp"
                >
                  <FaWhatsapp className="text-sm md:text-base" />
                </a>
                <a 
                  href="tel:+916232678136" 
                  className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-600 hover:scale-110 transition-all"
                  title="Call Us"
                >
                  <FaPhone className="text-sm md:text-base" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl text-white transition-all duration-300 ${
              isOpen ? 'bg-gray-700 rotate-45' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
            aria-label="More Actions"
          >
            <FaPlus className="text-xl md:text-2xl" />
          </button>
        </div>
      </div>

      {/* Toggle Visibility Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="w-8 h-8 bg-gray-800/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-gray-800 transition-colors shadow-sm"
        title={isVisible ? "Hide Widgets" : "Show Widgets"}
      >
        {isVisible ? <FaChevronDown size={12} /> : <FaChevronUp size={12} />}
      </button>
    </div>
  );
};

export default FloatingButtons;
