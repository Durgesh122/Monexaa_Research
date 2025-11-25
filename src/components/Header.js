import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AlertBanner from './AlertBanner';
import logo from '../assest/logo/monexaa-research1.png';
import { FaHome, FaBriefcase, FaBuilding, FaLightbulb, FaUniversalAccess, FaCreditCard, FaCommentDots, FaFileAlt, FaEnvelope, FaPhone, FaSearch, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaTimes, FaUserLock } from 'react-icons/fa';

function MenuToggle({ toggle }) {
  return (
    <button onClick={toggle} aria-label="Toggle menu" className="p-2 rounded-md bg-white/10 hover:bg-emerald-100 text-emerald-900">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
  const [topbarHeight, setTopbarHeight] = useState(52);
  const [headerHeight, setHeaderHeight] = useState(64);
  const [isTopbarHidden, setIsTopbarHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const topbarRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();


  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setMobileSearchOpen(false);
        setMobileContactOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const locked = isOpen || mobileSearchOpen || mobileContactOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, mobileSearchOpen, mobileContactOpen]);

  useEffect(() => {
    function measure() {
      const t = topbarRef.current ? topbarRef.current.offsetHeight : 48;
      const h = headerRef.current ? headerRef.current.offsetHeight : 56;
      setTopbarHeight(t);
      setHeaderHeight(h);
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const lastY = { value: window.scrollY };
    let ticking = false;
    function onScroll() {
      const currentY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const diff = currentY - lastY.value;
          const shouldHide = diff > 10 && currentY > 50;
          const shouldShow = diff < -10 || currentY < 50;
          if (shouldHide) {
            document.body.classList.add('topbar-hidden');
            setIsTopbarHidden(true);
          } else if (shouldShow) {
            document.body.classList.remove('topbar-hidden');
            setIsTopbarHidden(false);
          }
          setIsScrolled(currentY > 8);
          lastY.value = currentY;
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, x: "-50%", scale: 0.98, pointerEvents: 'none', transition: { duration: 0.35, ease: 'easeInOut' } },
    visible: { opacity: 1, y: 0, x: "-50%", scale: 1, pointerEvents: 'auto', transition: { duration: 0.55, ease: 'easeOut', type: 'spring', stiffness: 180, damping: 18 } },
  };
  

  return (
    <>
      {/* Topbar */}
      <div ref={topbarRef} className={`topbar bg-emerald-600/90 backdrop-blur-sm border-b border-emerald-800/10 fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ease-in-out will-change-transform ${isTopbarHidden ? '-translate-y-full' : 'translate-y-0'}`} role="region" aria-label="Contact information">
        <div className="topbar-inner relative max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap md:flex-nowrap items-center justify-between gap-2 px-3 py-2">
          <div className="topbar-left flex-shrink-0 flex flex-wrap justify-center sm:justify-start gap-3 items-center text-white text-xs sm:text-sm">
            <a href="mailto:support@monexaaresearch.com" className="contact-link flex items-center gap-1 hover:underline">
              <FaEnvelope className="text-sm" aria-hidden="true" />
              <span>support@monexaaresearch.com</span>
            </a>
            <a className="contact-link flex items-center gap-1 hover:underline" href="tel:+916232678136" aria-label="Phone"><FaPhone className="text-sm" aria-hidden="true" /> <span>+91 6232678136</span></a>
          </div>
          <div className="topbar-center hidden md:flex flex-1 justify-center min-w-[180px]">
            <form className="search-form flex items-center gap-2 bg-white border border-emerald-200 rounded-full px-2 py-1 shadow-sm w-full max-w-xs sm:max-w-md" onSubmit={e => e.preventDefault()} role="search" aria-label="Site search">
              <input
                type="search"
                name="q"
                placeholder="Search..."
                aria-label="Search"
                className="search-input flex-1 border-none outline-none px-2 py-1 text-emerald-900 text-xs sm:text-sm bg-transparent placeholder:text-emerald-400"
              />
              <button type="submit" className="search-btn w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition" aria-label="Submit search"><FaSearch /></button>
            </form>
          </div>
          <div className="topbar-right flex-shrink-0 flex gap-2 items-center">
            {/* Login Button */}
            <Link to="/admin/login" className="flex items-center gap-1 bg-white/20 hover:bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-medium transition border border-white/10">
              <FaUserLock className="text-xs" />
              <span>Login</span>
            </Link>
            
            {/* Mobile-only search button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); if (process.env.NODE_ENV === 'development') console.debug('search toggle'); setMobileSearchOpen(v => !v); setMobileContactOpen(false); }}
              aria-expanded={mobileSearchOpen}
              aria-label="Open search"
              className="md:hidden w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition"
            >
              <FaSearch />
            </button>
            <div className="flex gap-1">
              <a className="social w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://www.facebook.com/profile.php?id=61583903638593&sk=photos" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a className="social w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://x.com/MonexaaResearch" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a className="social w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://www.linkedin.com/company/monexaa-research/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a className="social w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://www.instagram.com/monexaa_research/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a className="social w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://www.youtube.com/@Monexaa-Research" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* Mobile contact panel */}
          {mobileContactOpen && (
            <div
              role="dialog"
              aria-label="Contact options"
              className="fixed bg-white rounded-md shadow-lg border border-emerald-100 p-3 text-emerald-900 md:hidden pointer-events-auto"
              style={{ top: topbarHeight, left: 12, right: 12, zIndex: 9999 }}
            >
              <div className="flex flex-col gap-2 text-sm">
                <a href="mailto:support@monexaaresearch.com" className="flex items-center gap-2 hover:bg-emerald-50 rounded px-2 py-2"> <FaEnvelope /> <span>support@monexaaresearch.com</span></a>
                <a href="tel:+916232678136" className="flex items-center gap-2 hover:bg-emerald-50 rounded px-2 py-2"> <FaPhone /> <span>+91 6232678136</span></a>
              </div>
            </div>
          )}

          {/* Mobile search panel */}
          {mobileSearchOpen && (
            <div
              role="dialog"
              aria-label="Search"
              className="fixed bg-white rounded-md shadow-lg border border-emerald-100 p-2 md:hidden pointer-events-auto w-[220px]"
              style={{ top: topbarHeight, right: 12, zIndex: 9999 }}
            >
              <form className="flex items-center gap-2" onSubmit={e => e.preventDefault()}>
                <input type="search" name="q" placeholder="Search..." aria-label="Search" className="flex-1 border border-emerald-200 rounded px-2 py-2 text-sm outline-none" />
                <button type="submit" className="px-2 py-1 bg-emerald-600 text-white rounded text-sm">Go</button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <header ref={headerRef} className={`site-header bg-white border-b border-emerald-100 shadow-sm fixed left-0 right-0 z-[99] transition-transform duration-300 ease-in-out will-change-transform`} style={{ top: 0, transform: `translateY(${isTopbarHidden ? 0 : topbarHeight}px)` }} role="banner">
        <div className="header-inner w-full flex items-center justify-between md:justify-start gap-3 py-2 relative">
          <div className="flex items-center gap-4 justify-start">
            <div className="logo flex-shrink-0 ml-8">
                <Link to="/" className="flex items-center rounded-lg">
                <img src={logo} alt="Monexaa Research" className="logo-img h-7 md:h-10 w-auto block m-0 p-0" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden mr-4">
            <MenuToggle toggle={() => setIsOpen(!isOpen)} />
          </div>

          {/* Header Navigation Buttons */}
          <nav className="hidden md:flex gap-2 md:gap-4 ml-8">
            <motion.div whileHover={{ scale: 1.05, y: -2, boxShadow: "0 4px 16px rgba(16, 185, 129, 0.18)" }} className="group flex flex-col items-center px-2 py-1 transition-all duration-300">
              <Link to="/" className="flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1 transition-all duration-300">
                  <FaHome />
                </motion.div>
                <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition-all duration-300">Home</span>
              </Link>
            </motion.div>
            <motion.div
              className="group flex flex-col items-center px-2 py-1 relative transition-all duration-300"
              onMouseEnter={() => {
                clearTimeout(window._dropdownTimeout);
                setDropdownOpen(true);
              }}
              onMouseLeave={() => {
                window._dropdownTimeout = setTimeout(() => setDropdownOpen(false), 350);
              }}
            >
              <div className="flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.3, rotate: 10, boxShadow: "0 4px 16px rgba(16, 185, 129, 0.18)" }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1 transition-all duration-300">
                  <FaBriefcase />
                </motion.div>
                <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition-all duration-300">Services</span>
              </div>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute left-1/2 top-full mt-2 min-w-[220px] bg-white border border-emerald-100 rounded shadow-lg z-50 flex justify-center"
                    onMouseEnter={() => {
                      clearTimeout(window._dropdownTimeout);
                      setDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      window._dropdownTimeout = setTimeout(() => setDropdownOpen(false), 350);
                    }}
                  >
                    <ul className="flex flex-col py-2 items-center w-full">
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/stock-option" className="block px-4 py-2 text-emerald-900">Stock Option</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/stock-future" className="block px-4 py-2 text-emerald-900">Stock Future</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/equity-platinum" className="block px-4 py-2 text-emerald-900">Equity Platinum</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/rapid-index" className="block px-4 py-2 text-emerald-900">Rapid Index</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/rapid-option" className="block px-4 py-2 text-emerald-900">Rapid Option</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/option-btst" className="block px-4 py-2 text-emerald-900">Option BTST</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/cash-positional" className="block px-4 py-2 text-emerald-900">Cash Positional</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/elite-combo" className="block px-4 py-2 text-emerald-900">Elite Combo</Link></motion.li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="group flex flex-col items-center px-2 py-1 relative transition-all duration-300"
              onMouseEnter={() => {
                clearTimeout(window._companyTimeout);
                setHoveredMenu('company');
              }}
              onMouseLeave={() => {
                window._companyTimeout = setTimeout(() => setHoveredMenu(null), 350);
              }}
            >
              <div className="flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.3, rotate: 10, boxShadow: "0 4px 16px rgba(16, 185, 129, 0.18)" }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1 transition-all duration-300">
                  <FaBuilding />
                </motion.div>
                <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition-all duration-300">Company</span>
              </div>
              <AnimatePresence>
                {hoveredMenu === 'company' && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute left-1/2 top-full mt-2 min-w-[220px] bg-white border border-emerald-100 rounded shadow-lg z-50 flex justify-center"
                    onMouseEnter={() => {
                      clearTimeout(window._companyTimeout);
                      setHoveredMenu('company');
                    }}
                    onMouseLeave={() => {
                      window._companyTimeout = setTimeout(() => setHoveredMenu(null), 350);
                    }}
                  >
                    <ul className="flex flex-col py-2 items-center w-full">
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#e0f2fe" }} className="transition-all duration-300 w-full text-center"><Link to="/aboutUs" className="block px-4 py-2 text-emerald-900">About Us</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#e0f2fe" }} className="transition-all duration-300 w-full text-center"><Link to="/vision" className="block px-4 py-2 text-emerald-900">Vision & Mission</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#e0f2fe" }} className="transition-all duration-300 w-full text-center"><Link to="/refund-policy" className="block px-4 py-2 text-emerald-900">Refund Policy</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#e0f2fe" }} className="transition-all duration-300 w-full text-center"><Link to="/privacy-policy" className="block px-4 py-2 text-emerald-900">Privacy Policy</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#e0f2fe" }} className="transition-all duration-300 w-full text-center"><Link to="/disclaimer" className="block px-4 py-2 text-emerald-900">Disclaimer</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#e0f2fe" }} className="transition-all duration-300 w-full text-center"><Link to="/terms-and-conditions" className="block px-4 py-2 text-emerald-900">Terms & Conditions</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#e0f2fe" }} className="transition-all duration-300 w-full text-center"><Link to="/disclosure" className="block px-4 py-2 text-emerald-900">Disclosure</Link></motion.li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <Link to="/jobs" className="group flex flex-col items-center px-2 py-1">
              <motion.div whileHover={{ scale: 1.3, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1">
                <FaBriefcase />
              </motion.div>
              <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition">Job</span>
            </Link>
            <motion.div
              className="group flex flex-col items-center px-2 py-1 relative transition-all duration-300"
              onMouseEnter={() => {
                clearTimeout(window._insightsTimeout);
                setHoveredMenu('insights');
              }}
              onMouseLeave={() => {
                window._insightsTimeout = setTimeout(() => setHoveredMenu(null), 350);
              }}
            >
              <div className="flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.3, rotate: 10, boxShadow: "0 4px 16px rgba(253, 224, 71, 0.18)" }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1 transition-all duration-300">
                  <FaLightbulb />
                </motion.div>
                <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition-all duration-300">Insights</span>
              </div>
              <AnimatePresence>
                {hoveredMenu === 'insights' && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute left-1/2 top-full mt-2 min-w-[220px] bg-white border border-emerald-100 rounded shadow-lg z-50 flex justify-center"
                    onMouseEnter={() => {
                      clearTimeout(window._insightsTimeout);
                      setHoveredMenu('insights');
                    }}
                    onMouseLeave={() => {
                      window._insightsTimeout = setTimeout(() => setHoveredMenu(null), 350);
                    }}
                  >
                    <ul className="flex flex-col py-2 items-center w-full">
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#fef9c3" }} className="transition-all duration-300 w-full text-center"><Link to="/blogs" className="block px-4 py-2 text-emerald-900">Blogs</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#fef9c3" }} className="transition-all duration-300 w-full text-center"><Link to="/market-news" className="block px-4 py-2 text-emerald-900">Market News</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#fef9c3" }} className="transition-all duration-300 w-full text-center"><Link to="/complaint-board" className="block px-4 py-2 text-emerald-900">Complaint Board</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#fef9c3" }} className="transition-all duration-300 w-full text-center"><Link to="/grievance-redressal" className="block px-4 py-2 text-emerald-900">Grievance Redressal</Link></motion.li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="group flex flex-col items-center px-2 py-1 relative transition-all duration-300"
              onMouseEnter={() => {
                clearTimeout(window._accessTimeout);
                setHoveredMenu('accessibility');
              }}
              onMouseLeave={() => {
                window._accessTimeout = setTimeout(() => setHoveredMenu(null), 350);
              }}
            >
              <div className="flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.3, rotate: 10, boxShadow: "0 4px 16px rgba(16, 185, 129, 0.18)" }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1 transition-all duration-300">
                  <FaUniversalAccess />
                </motion.div>
                <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition-all duration-300">Accessibility</span>
              </div>
              <AnimatePresence>
                {hoveredMenu === 'accessibility' && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute left-1/2 top-full mt-2 min-w-[220px] bg-white border border-emerald-100 rounded shadow-lg z-50 flex justify-center"
                    onMouseEnter={() => {
                      clearTimeout(window._accessTimeout);
                      setHoveredMenu('accessibility');
                    }}
                    onMouseLeave={() => {
                      window._accessTimeout = setTimeout(() => setHoveredMenu(null), 350);
                    }}
                  >
                    <ul className="flex flex-col py-2 items-center w-full">
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/accessibility-statement" className="block px-4 py-2 text-emerald-900">Accessibility Statement</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/accessibility-feedback" className="block px-4 py-2 text-emerald-900">Accessibility Feedback</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#d1fae5" }} className="transition-all duration-300 w-full text-center"><Link to="/accessibility-media" className="block px-4 py-2 text-emerald-900">Accessibility Media</Link></motion.li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="group flex flex-col items-center px-2 py-1 relative transition-all duration-300"
              onMouseEnter={() => {
                clearTimeout(window._dashboardTimeout);
                setHoveredMenu('dashboard');
              }}
              onMouseLeave={() => {
                window._dashboardTimeout = setTimeout(() => setHoveredMenu(null), 350);
              }}
            >
              <div className="flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.3, rotate: 10, boxShadow: "0 4px 16px rgba(16, 185, 129, 0.18)" }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1 transition-all duration-300">
                  <FaFileAlt />
                </motion.div>
                <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition-all duration-300">Dashboard</span>
              </div>
              <AnimatePresence>
                {hoveredMenu === 'dashboard' && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute left-1/2 top-full mt-2 min-w-[220px] bg-white border border-emerald-100 rounded shadow-lg z-50 flex justify-center"
                    onMouseEnter={() => {
                      clearTimeout(window._dashboardTimeout);
                      setHoveredMenu('dashboard');
                    }}
                    onMouseLeave={() => {
                      window._dashboardTimeout = setTimeout(() => setHoveredMenu(null), 350);
                    }}
                  >
                    <ul className="flex flex-col py-2 items-center w-full">
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#f3e8ff" }} className="transition-all duration-300 w-full text-center"><Link to="/kyc-document" className="block px-4 py-2 text-emerald-900">Kyc Document</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#f3e8ff" }} className="transition-all duration-300 w-full text-center"><Link to="/investor-handbook" className="block px-4 py-2 text-emerald-900">Investor Handbook</Link></motion.li>
                      <motion.li whileHover={{ x: 4, scale: 1.02, backgroundColor: "#f3e8ff" }} className="transition-all duration-300 w-full text-center"><Link to="/anti-money-laundering" className="block px-4 py-2 text-emerald-900">Anti-Money Laundering</Link></motion.li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <Link to="/payment" className="group flex flex-col items-center px-2 py-1">
              <motion.div whileHover={{ scale: 1.3, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1">
                <FaCreditCard />
              </motion.div>
              <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition">Payment</span>
            </Link>
            <Link to="/complaint-box" className="group flex flex-col items-center px-2 py-1">
              <motion.div whileHover={{ scale: 1.3, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1">
                <FaCommentDots />
              </motion.div>
              <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition">Complaint Box</span>
            </Link>
            <Link to="/research-reports" className="group flex flex-col items-center px-2 py-1">
              <motion.div whileHover={{ scale: 1.3, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1">
                <FaFileAlt />
              </motion.div>
              <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition">Research Reports</span>
            </Link>
              <Link to="/e-sign-consent" className="group flex flex-col items-center px-2 py-1">
                <motion.div whileHover={{ scale: 1.3, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1">
                  <FaFileAlt />
                </motion.div>
                <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition">E-Sign Consent</span>
              </Link>
              <Link to="/contact-us" className="group flex flex-col items-center px-2 py-1">
                <motion.div whileHover={{ scale: 1.3, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1">
                  <FaEnvelope />
                </motion.div>
                <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition">Contact Us</span>
              </Link>
              <Link to="/faqs" className="group flex flex-col items-center px-2 py-1">
                <motion.div whileHover={{ scale: 1.3, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-emerald-600 text-xl mb-1">
                  <FaCommentDots />
                </motion.div>
                <span className="text-xs md:text-sm font-medium group-hover:text-emerald-700 transition">FAQ's</span>
              </Link>
          </nav>

          {/* ...existing code... */}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[9999] shadow-2xl overflow-y-auto md:hidden"
            >
              <div className="p-4 flex justify-between items-center border-b border-emerald-100">
                <img src={logo} alt="Monexaa" className="h-8" />
                <button onClick={() => setIsOpen(false)} className="p-2 text-emerald-900 hover:bg-emerald-50 rounded-full">
                  <FaTimes />
                </button>
              </div>
              <div className="py-4 flex flex-col">
                <Link to="/" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center gap-3"><FaHome /> Home</Link>
                
                {/* Services */}
                <div className="border-b border-emerald-50">
                  <button onClick={() => setMobileOpenMenu(mobileOpenMenu === 'services' ? null : 'services')} className="w-full px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center justify-between">
                    <span className="flex items-center gap-3"><FaBriefcase /> Services</span>
                    <span className={`transition-transform ${mobileOpenMenu === 'services' ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  <AnimatePresence>
                    {mobileOpenMenu === 'services' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-emerald-50/50">
                        <Link to="/stock-option" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Stock Option</Link>
                        <Link to="/stock-future" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Stock Future</Link>
                        <Link to="/equity-platinum" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Equity Platinum</Link>
                        <Link to="/rapid-index" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Rapid Index</Link>
                        <Link to="/rapid-option" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Rapid Option</Link>
                        <Link to="/option-btst" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Option BTST</Link>
                        <Link to="/cash-positional" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Cash Positional</Link>
                        <Link to="/elite-combo" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Elite Combo</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Company */}
                <div className="border-b border-emerald-50">
                  <button onClick={() => setMobileOpenMenu(mobileOpenMenu === 'company' ? null : 'company')} className="w-full px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center justify-between">
                    <span className="flex items-center gap-3"><FaBuilding /> Company</span>
                    <span className={`transition-transform ${mobileOpenMenu === 'company' ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  <AnimatePresence>
                    {mobileOpenMenu === 'company' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-emerald-50/50">
                        <Link to="/aboutUs" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">About Us</Link>
                        <Link to="/vision" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Vision & Mission</Link>
                        <Link to="/refund-policy" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Refund Policy</Link>
                        <Link to="/privacy-policy" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Privacy Policy</Link>
                        <Link to="/disclaimer" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Disclaimer</Link>
                        <Link to="/terms-and-conditions" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Terms & Conditions</Link>
                        <Link to="/disclosure" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Disclosure</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/jobs" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center gap-3"><FaBriefcase /> Job</Link>

                {/* Insights */}
                <div className="border-b border-emerald-50">
                  <button onClick={() => setMobileOpenMenu(mobileOpenMenu === 'insights' ? null : 'insights')} className="w-full px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center justify-between">
                    <span className="flex items-center gap-3"><FaLightbulb /> Insights</span>
                    <span className={`transition-transform ${mobileOpenMenu === 'insights' ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  <AnimatePresence>
                    {mobileOpenMenu === 'insights' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-emerald-50/50">
                        <Link to="/blogs" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Blogs</Link>
                        <Link to="/market-news" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Market News</Link>
                        <Link to="/complaint-board" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Complaint Board</Link>
                        <Link to="/grievance-redressal" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Grievance Redressal</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accessibility */}
                <div className="border-b border-emerald-50">
                  <button onClick={() => setMobileOpenMenu(mobileOpenMenu === 'accessibility' ? null : 'accessibility')} className="w-full px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center justify-between">
                    <span className="flex items-center gap-3"><FaUniversalAccess /> Accessibility</span>
                    <span className={`transition-transform ${mobileOpenMenu === 'accessibility' ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  <AnimatePresence>
                    {mobileOpenMenu === 'accessibility' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-emerald-50/50">
                        <Link to="/accessibility-statement" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Accessibility Statement</Link>
                        <Link to="/accessibility-feedback" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Accessibility Feedback</Link>
                        <Link to="/accessibility-media" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Accessibility Media</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dashboard */}
                <div className="border-b border-emerald-50">
                  <button onClick={() => setMobileOpenMenu(mobileOpenMenu === 'dashboard' ? null : 'dashboard')} className="w-full px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center justify-between">
                    <span className="flex items-center gap-3"><FaFileAlt /> Dashboard</span>
                    <span className={`transition-transform ${mobileOpenMenu === 'dashboard' ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  <AnimatePresence>
                    {mobileOpenMenu === 'dashboard' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-emerald-50/50">
                        <Link to="/kyc-document" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Kyc Document</Link>
                        <Link to="/investor-handbook" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Investor Handbook</Link>
                        <Link to="/anti-money-laundering" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-emerald-800 hover:text-emerald-600">Anti-Money Laundering</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/payment" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center gap-3"><FaCreditCard /> Payment</Link>
                <Link to="/complaint-box" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center gap-3"><FaCommentDots /> Complaint Box</Link>
                <Link to="/research-reports" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center gap-3"><FaFileAlt /> Research Reports</Link>
                <Link to="/e-sign-consent" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center gap-3"><FaFileAlt /> E-Sign Consent</Link>
                <Link to="/contact-us" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center gap-3"><FaEnvelope /> Contact Us</Link>
                <Link to="/faqs" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center gap-3"><FaCommentDots /> FAQ's</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Render AlertBanner fixed directly under header (uses measured heights) */}
      <AlertBanner 
        top={0} 
        className="will-change-transform"
        style={{ 
          transform: `translateY(${isTopbarHidden ? headerHeight : (topbarHeight || 0) + (headerHeight || 0)}px)`,
          transition: 'transform 0.3s ease-in-out'
        }}
      />

      {/* Add offset for fixed header/topbar and alert (dynamic to avoid overlap) */}
      <div aria-hidden="true" style={{ height: (topbarHeight || 0) + (headerHeight || 0) + 28 }} />
    </>
  );
}
