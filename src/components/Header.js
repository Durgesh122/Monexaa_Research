import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useHoverDropdown from '../hooks/useHoverDropdown';

import { FaEnvelope, FaPhone, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaSearch, FaHome, FaBriefcase, FaBuilding, FaLightbulb, FaUniversalAccess, FaTachometerAlt, FaCreditCard, FaCommentDots, FaFileAlt } from 'react-icons/fa';
import logo from '../assest/logo/monexaa-research1.png';
import AlertBanner from './AlertBanner';


export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState(null); // New state for mobile submenus
  const [topbarHeight, setTopbarHeight] = useState(52);
  const [headerHeight, setHeaderHeight] = useState(64);
  const [isTopbarHidden, setIsTopbarHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const topbarRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const location = useLocation();
  const { openMenu, handleMouseEnter, handleMouseLeave, handleClick, closeTimerRef } = useHoverDropdown();

  // Close menu on Escape and on large resize
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        setMobileSearchOpen(false);
        setMobileContactOpen(false);
        handleMouseLeave(); // Close desktop dropdowns
      }
    }
    function onResize() {
      if (window.innerWidth > 700) {
        setOpen(false);
        setMobileSearchOpen(false);
        setMobileContactOpen(false);
        handleMouseLeave(); // Close desktop dropdowns
      }
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [handleMouseLeave]); // Add handleMouseLeave to dependencies

  // Prevent body scroll when mobile panels or drawer are open
  useEffect(() => {
    const locked = open || mobileSearchOpen || mobileContactOpen;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = locked ? 'hidden' : '';
    }
    return () => {
      if (typeof document !== 'undefined') document.body.style.overflow = '';
    };
  }, [open, mobileSearchOpen, mobileContactOpen]);

  // Measure topbar/header heights and update on resize to keep content offset correct
  useEffect(() => {
    function measure() {
      const t = topbarRef.current ? topbarRef.current.offsetHeight : 48;
      const h = headerRef.current ? headerRef.current.offsetHeight : 56;
      setTopbarHeight(t);
      setHeaderHeight(h);
      // set CSS variables so layout can use them to offset content
      if (typeof document !== 'undefined') {
        try {
          document.documentElement.style.setProperty('--topbar-height', `${t}px`);
          document.documentElement.style.setProperty('--header-height', `${h}px`);
        } catch (e) {
          // ignore
        }
      }
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Hide topbar on scroll down, show on scroll up
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
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


  // Clear any pending submenu close timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Topbar */}
      <div ref={topbarRef} className="topbar bg-emerald-600/90 backdrop-blur-sm border-b border-emerald-800/10 fixed top-0 left-0 right-0 z-[100] transition-transform duration-300" role="region" aria-label="Contact information">
        <div className="topbar-inner relative max-w-6xl mx-auto flex items-center justify-between gap-1 px-3 sm:px-2 py-1 overflow-x-auto whitespace-nowrap">
          <div className="topbar-left flex-shrink-0 flex gap-1 items-center text-white text-xs sm:text-sm">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); if (process.env.NODE_ENV === 'development') console.debug('contact toggle'); setMobileContactOpen(v => !v); setMobileSearchOpen(false); }}
              aria-expanded={mobileContactOpen}
              aria-label="Toggle contact"
              className="contact-link flex items-center gap-1 hover:underline"
            >
              <FaEnvelope className="text-sm" aria-hidden="true" />
              <span className="hidden sm:inline">support@monexaaresearch.com</span>
            </button>
            <a className="contact-link flex items-center gap-1 hover:underline" href="tel:+916232678136" aria-label="Phone"><FaPhone className="text-sm" aria-hidden="true" /> <span className="hidden sm:inline">+91 6232678136</span></a>
          </div>
          <div className="topbar-center hidden md:flex flex-1 justify-center min-w-0">
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
          <div className="topbar-right flex-shrink-0 flex gap-1 sm:gap-2 items-center">
            {/* Mobile-only search button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); if (process.env.NODE_ENV === 'development') console.debug('search toggle'); setMobileSearchOpen(v => !v); setMobileContactOpen(false); }}
              aria-expanded={mobileSearchOpen}
              aria-label="Open search"
              className="md:hidden w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition"
            >
              <FaSearch />
            </button>
            <a className="social w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://www.facebook.com/profile.php?id=61583903638593&sk=photos" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a className="social w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://x.com/MonexaaResearch" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a className="social w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://www.linkedin.com/company/monexaa-research/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a className="social w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://www.instagram.com/monexaa_research/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a className="social w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-700 text-white transition" href="https://www.youtube.com/@Monexaa-Research" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
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
      <header ref={headerRef} className="site-header bg-white border-b border-emerald-100 shadow-sm fixed left-0 right-0 z-[99]" style={{ top: topbarHeight }} role="banner">
        <div className="header-inner max-w-6xl mx-auto flex items-center justify-between gap-3 px-2 py-1 relative">
          <div className="logo flex-shrink-0">
              <Link to="/" className="flex items-center p-0 md:p-0 rounded-lg pl-0">
              <img src={logo} alt="Monexaa Research" className="logo-img h-6 sm:h-7 md:h-10 w-auto block -ml-1" />
            </Link>
          </div>
          <nav
            id="primary-navigation"
            className={`primary-nav md:flex md:items-center md:justify-center md:static md:bg-transparent md:border-0 md:ml-0`}
            role="navigation"
            aria-label="Main"
          >
            {/* Desktop nav: inline row on md+; hidden on mobile (drawer used) */}
            <ul className="hidden md:flex md:flex-row md:items-center md:gap-2 md:overflow-x-auto md:flex-nowrap md:scroll-smooth md:pr-2">
              <li><Link className={`flex items-center gap-2 px-2 py-0.5 rounded text-sm text-emerald-900 whitespace-nowrap ${location.pathname === '/' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/"><FaHome /> Home</Link></li>
              <li
                className="relative group"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-2 px-2 py-1 rounded text-sm text-emerald-900 hover:bg-emerald-50"
                  aria-expanded={openMenu === 'services'}
                  onClick={() => handleClick('services')}
                  aria-haspopup="true"
                >
                  <FaBriefcase /> Services
                </button>
                <ul className={`submenu transition-all duration-200 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:mt-1 md:bg-white md:border md:border-emerald-100 md:rounded-lg md:shadow-lg min-w-[180px] z-40 py-2 ${openMenu === 'services' ? 'block' : 'hidden'} md:group-hover:block`} role="menu" aria-label="Services submenu">
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/services/cash-positional' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/services/cash-positional">Cash Positional</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/services/elite-combo' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/services/elite-combo">Elite Combo</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/services/equity-platniam' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/services/equity-platniam">Equity Platniam</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/services/option-btst' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/services/option-btst">Option BTST</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/services/rapid-index' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/services/rapid-index">Rapid Index</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/services/rapid-option' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/services/rapid-option">Rapid Option</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/services/stock-future' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/services/stock-future">Stock Future</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/services/stock-option' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/services/stock-option">Stock Option</Link></li>
                </ul>
              </li>
              <li
                className="relative group"
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-2 px-2 py-1 rounded text-sm text-emerald-900 hover:bg-emerald-50"
                  aria-expanded={openMenu === 'company'}
                  onClick={() => handleClick('company')}
                  aria-haspopup="true"
                >
                  <FaBuilding /> Company
                </button>
                <ul className={`submenu transition-all duration-200 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:mt-1 md:bg-white md:border md:border-emerald-100 md:rounded-md md:shadow-lg min-w-[140px] z-40 py-2 ${openMenu === 'company' ? 'block' : 'hidden'} md:group-hover:block`} role="menu" aria-label="Company submenu">
                  <li role="none"><Link className={`block px-4 py-2 ${location.pathname === '/about' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/about">About Us</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 ${location.pathname === '/vision' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/vision">Vision</Link></li>
                </ul>
              </li>
              <li><Link className={`flex items-center gap-2 px-2 py-0.5 rounded text-sm text-emerald-900 whitespace-nowrap ${location.pathname === '/jobs' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/jobs"><FaBriefcase /> Jobs</Link></li>
              <li
                className="relative group"
                onMouseEnter={() => handleMouseEnter('insight')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-2 px-2 py-1 rounded text-sm text-emerald-900 hover:bg-emerald-50"
                  aria-expanded={openMenu === 'insight'}
                  onClick={() => handleClick('insight')}
                  aria-haspopup="true"
                >
                  <FaLightbulb /> Insight
                </button>
                <ul className={`submenu transition-all duration-200 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:mt-1 md:bg-white md:border md:border-emerald-100 md:rounded-lg md:shadow-lg min-w-[160px] z-40 py-2 ${openMenu === 'insight' ? 'block' : 'hidden'} md:group-hover:block`} role="menu" aria-label="Insight submenu">
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/blogs' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/blogs">Blogs</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/market-news' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/market-news">Market News</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/complaint-data' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/complaint-data">Complaint Data</Link></li>
                  <li role="none"><Link className={`block px-4 py-2 rounded transition ${location.pathname === '/grievance-redressal' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} role="menuitem" to="/grievance-redressal">Grievance Redressal</Link></li>
                </ul>
              </li>
              <li className="relative group">
                <Link
                  className={`flex items-center gap-2 px-2 py-1 rounded text-sm text-emerald-900 whitespace-nowrap ${location.pathname === '/accessibility-statement' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`}
                  to="/accessibility-statement"
                >
                  <FaUniversalAccess /> Accessibility
                </Link>
              </li>
              <li className="relative group">
                <Link
                  className={`flex items-center gap-2 px-2 py-1 rounded text-sm text-emerald-900 whitespace-nowrap ${location.pathname === '/dashboard' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`}
                  to="/dashboard"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
              </li>
              <li><Link className={`flex items-center gap-2 px-2 py-0.5 rounded text-sm text-emerald-900 whitespace-nowrap ${location.pathname === '/payment' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/payment"><FaCreditCard /> Payment</Link></li>
              <li><Link className={`flex items-center gap-2 px-2 py-1 rounded text-sm text-emerald-900 whitespace-nowrap ${location.pathname === '/complaint' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/complaint"><FaCommentDots /> Complaint</Link></li>
              <li><Link className={`flex items-center gap-2 px-2 py-1 rounded text-sm text-emerald-900 whitespace-nowrap ${location.pathname === '/reports' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/reports"><FaFileAlt /> Reports</Link></li>
              <li><Link className={`flex items-center gap-2 px-2 py-1 rounded text-sm text-emerald-900 whitespace-nowrap ${location.pathname === '/contact' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/contact"><FaEnvelope /> Contact</Link></li>
            </ul>
          </nav>


          {/* Mobile toggle (moved after nav so nav can be centered on md+) */}
          <button
            className={`nav-toggle block md:hidden bg-emerald-100 border border-emerald-200 rounded-md p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${open ? 'open bg-emerald-200' : ''}`}
            aria-controls="primary-navigation"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block w-6 h-5">
              <span className={`absolute left-0 w-6 h-0.5 bg-emerald-900 rounded transition-all duration-200 ${open ? 'rotate-45 top-2.5' : 'top-0'}`}></span>
              <span className={`absolute left-0 w-6 h-0.5 bg-emerald-900 rounded transition-all duration-200 ${open ? 'opacity-0 left-3' : 'top-2.5'}`}></span>
              <span className={`absolute left-0 w-6 h-0.5 bg-emerald-900 rounded transition-all duration-200 ${open ? '-rotate-45 top-2.5' : 'top-5'}`}></span>
            </span>
          </button>
          {/* Mobile drawer & overlay (left sliding) */}
          {open && (
            <>
              <div
                className="fixed inset-0 z-60 bg-black/40 md:hidden"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <aside className="fixed left-0 bottom-0 z-70 w-full sm:w-3/4 max-w-sm bg-white shadow-lg md:hidden transform transition-transform duration-300" style={{ top: topbarHeight + headerHeight }} role="dialog" aria-label="Mobile menu">
                <div className="p-3 h-full overflow-y-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-emerald-900">Menu</div>
                    <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md bg-emerald-100 hover:bg-emerald-200">
                      ✕
                    </button>
                  </div>
                  <ul className="flex flex-col gap-1">
                    <li><Link onClick={() => setOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === '/' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/"><FaHome /> Home</Link></li>
                    <li>
                      <button
                        onClick={() => setMobileOpenMenu(prev => (prev === 'services' ? null : 'services'))}
                        className={`flex items-center gap-2 px-3 py-2 rounded w-full text-left ${mobileOpenMenu === 'services' || location.pathname.startsWith('/services') ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`}
                        aria-expanded={mobileOpenMenu === 'services'}
                      >
                        <FaBriefcase /> Services
                      </button>
                      <ul className={`pl-6 mt-1 flex flex-col gap-1 ${mobileOpenMenu === 'services' || location.pathname.startsWith('/services') ? 'block' : 'hidden'}`}>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/services/cash-positional' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/services/cash-positional">Cash Positional</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/services/elite-combo' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/services/elite-combo">Elite Combo</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/services/equity-platniam' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/services/equity-platniam">Equity Platniam</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/services/option-btst' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/services/option-btst">Option BTST</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/services/rapid-index' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/services/rapid-index">Rapid Index</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/services/rapid-option' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/services/rapid-option">Rapid Option</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/services/stock-future' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/services/stock-future">Stock Future</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/services/stock-option' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/services/stock-option">Stock Option</Link></li>
                      </ul>
                    </li>
                    <li>
                      <button
                        onClick={() => setMobileOpenMenu(prev => (prev === 'company' ? null : 'company'))}
                        className={`flex items-center gap-2 px-3 py-2 rounded w-full text-left ${mobileOpenMenu === 'company' || location.pathname === '/about' || location.pathname === '/vision' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`}
                        aria-expanded={mobileOpenMenu === 'company'}
                      >
                        <FaBuilding /> Company
                      </button>
                      <ul className={`pl-6 mt-1 flex flex-col gap-1 ${mobileOpenMenu === 'company' || location.pathname === '/about' || location.pathname === '/vision' ? 'block' : 'hidden'}`}>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/about' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/about">About Us</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/vision' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/vision">Vision</Link></li>
                      </ul>
                    </li>
                    <li><Link onClick={() => setOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === '/jobs' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/jobs"><FaBriefcase /> Jobs</Link></li>
                    <li>
                      <button
                        onClick={() => setMobileOpenMenu(prev => (prev === 'insight' ? null : 'insight'))}
                        className={`flex items-center gap-2 px-3 py-2 rounded w-full text-left ${mobileOpenMenu === 'insight' || location.pathname === '/blogs' || location.pathname === '/market-news' || location.pathname === '/complaint-data' || location.pathname === '/grievance-redressal' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`}
                        aria-expanded={mobileOpenMenu === 'insight'}
                      >
                        <FaLightbulb /> Insight
                      </button>
                      <ul className={`pl-6 mt-1 flex flex-col gap-1 ${mobileOpenMenu === 'insight' || location.pathname === '/blogs' || location.pathname === '/market-news' || location.pathname === '/complaint-data' || location.pathname === '/grievance-redressal' ? 'block' : 'hidden'}`}>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/blogs' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/blogs">Blogs</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/market-news' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/market-news">Market News</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/complaint-data' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/complaint-data">Complaint Data</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`px-3 py-2 rounded ${location.pathname === '/grievance-redressal' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/grievance-redressal">Grievance Redressal</Link></li>
                      </ul>
                    </li>
                    <li><Link onClick={() => setOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === '/accessibility-statement' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/accessibility-statement"><FaUniversalAccess /> Accessibility</Link></li>
                    <li><Link onClick={() => setOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === '/payment' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/payment"><FaCreditCard /> Payment</Link></li>
                    <li><Link onClick={() => setOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === '/complaint' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/complaint"><FaCommentDots /> Complaint Box</Link></li>
                    <li><Link onClick={() => setOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === '/reports' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/reports"><FaFileAlt /> Research Report</Link></li>
                    <li><Link onClick={() => setOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === '/contact' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/contact"><FaEnvelope /> Contact Us</Link></li>
                    <li><Link onClick={() => setOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === '/consent-form' ? 'bg-emerald-100' : 'hover:bg-emerald-50'}`} to="/consent-form"><FaFileAlt /> Consent Form</Link></li>
                  </ul>
                </div>
              </aside>
            </>
          )}
        </div>
      </header>
      {/* Render AlertBanner fixed directly under header (uses measured heights) */}
      <AlertBanner top={(topbarHeight || 0) + (headerHeight || 0)} />

      {/* Add offset for fixed header/topbar and alert (dynamic to avoid overlap) */}
      <div aria-hidden="true" style={{ height: (topbarHeight || 0) + (headerHeight || 0) + 28 }} />
    </>
  );
}
