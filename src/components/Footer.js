import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Using Link for internal navigation
import logo from '../assest/logo/monexaa-research1.png';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const [showDesignerInfo, setShowDesignerInfo] = useState(false);

  // Inject Google Translate widget script and init function for in-page translation
  // Removed Google Translate widget injection to avoid runtime reloads/recursion.
  // Language is now handled locally (lang attribute + localStorage) without reloading the page.

  // payment alert visibility (persistent)
  const showPaymentAlert = true; // always show, non-dismissible

  const socialLinks = [
    { icon: <FaFacebookF />, href: 'https://www.facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, href: 'https://x.com/MonexaaResearch', label: 'Twitter' },
    { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/company/monexaa-research/', label: 'LinkedIn' },
    { icon: <FaInstagram />, href: 'https://www.instagram.com/monexaa_research/', label: 'Instagram' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/6232678136', label: 'WhatsApp' },
  ];

  const footerSections = {
    company: [
      { name: 'About Us', path: '/aboutUs' },
      { name: 'Blogs', path: '/blogs' },
      { name: 'Market News', path: '/marketNews' },
      { name: 'Contact Us', path: '/contactUs' },
    ],
    services: [
      { name: 'Rapid Index', path: '/rapidIndex' },
      { name: 'Rapid Option', path: '/rapidOption' },
      { name: 'Cash Positional', path: '/cashPositional' },
      { name: 'Stock Future', path: '/stockFuture' },
      { name: 'Elite Combo', path: '/eliteCombo' },
    ],
    legal: [
      { name: 'Terms & Conditions', path: '/termsAndConditions' },
      { name: 'Privacy Policy', path: '/privacyPolicy' },
      { name: 'Disclaimer', path: '/disclaimer' },
      { name: 'Refund Policy', path: '/refundPolicy' },
      { name: 'Disclosure', path: '/disclosure' },
    ],
  };

  // language selector removed

  return (
    <footer className="bg-[#532822] text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 md:overflow-x-visible">
        {/* Top section with logo, navigation, and contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Logo and About */}
          <div className="space-y-4 flex flex-col items-center text-center">
            <img className="h-10 sm:h-12 md:h-14 mx-auto" src={logo} alt="Monexaa Research" />
            <p className="text-sm text-gray-200 max-w-xs mx-auto">
              SEBI registered research house delivering timely market insights and reports for informed investment decisions.
            </p>
              <div className="flex flex-wrap gap-3 justify-center" style={{rowGap:'0.75rem'}}>
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-white transition-colors duration-300 p-2 rounded-md text-xl sm:text-2xl"
                    aria-label={item.label}
                  >
                    <span className="sr-only">{item.label}</span>
                    <span className="inline-block align-middle">{item.icon}</span>
                  </a>
                ))}
              </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                {footerSections.company.map((item) => (
                  <li key={item.name}>
                      <Link to={item.path} className="text-base text-gray-200 hover:text-white transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Services</h3>
              <ul className="mt-4 space-y-2">
                {footerSections.services.map((item) => (
                  <li key={item.name}>
                      <Link to={item.path} className="text-base text-gray-200 hover:text-white transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                {footerSections.legal.map((item) => (
                  <li key={item.name}>
                      <Link to={item.path} className="text-base text-gray-200 hover:text-white transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Contact Us</h3>
            <div className="mt-4 space-y-3 text-base text-gray-200">
              <p>261, PU-4, Plot No. 26, Scheme No. 54, Indore, Madhya Pradesh – 452010</p>
              <p>
                <a href="mailto:support@monexaaresearch.com" className="hover:text-white transition-colors duration-300">
                    support@monexaaresearch.com
                </a>
              </p>
              <p>
                <a href="tel:+916232678136" className="hover:text-white transition-colors duration-300">
                    +91 6232678136
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* SEBI Details Section */}
        <div className="mt-12 border-t pt-8 border-white overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-200">SEBI Registered Research Analyst</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm text-white">
            <p><strong className="font-medium text-white">Registration No:</strong> INH000020387</p>
            <p><strong className="font-medium text-white">Registered Name:</strong> Monnexaa Research Private Limited</p>
            <p><strong className="font-medium text-white">Compliance Officer:</strong> Satish Kumar Pandey</p>
            <p><strong className="font-medium text-white">GST No:</strong> 23DVAPP2697J1Z8</p>
            <p><strong className="font-medium text-white">CIN:</strong> U66190MP2025PTC080034</p>
            <p><strong className="font-medium text-white">BSE Enlistment No:</strong> 6554</p>
            <p><strong className="font-medium text-white">Validity:</strong> 08-May-2025 to Perpetual</p>
          </div>
          <p className="mt-4 text-xs text-white">
            <strong className="font-medium text-white">Disclaimer:</strong> Investments in securities market are subject to market risks. Read all the related documents carefully before investing.
          </p>
        </div>

        {/* Payment alert (persistent, non-dismissible) */}
        {showPaymentAlert && (
          <div className="mt-6 mb-4 px-4 py-3 sm:px-6 sm:py-4 rounded bg-yellow-50 text-amber-900 border-l-4 border-amber-500 text-sm sm:text-base" role="alert" aria-live="polite">
            <div className="flex items-start gap-4">
              <div className="text-sm sm:text-base">
                <p className="font-medium">कृपया ध्यान दें —</p>
                <p className="mt-1">प्रिय ग्राहक, आपका भुगतान तभी स्वीकार किया जाएगा जब आप Monexaa Research वेबसाइट पर दी गई खाता जानकारी का उपयोग करेंगे। हम केवल Monexaa Research के खातों में किए गए भुगतान ही स्वीकार करते हैं। Monexaa Research केवल अपने खाते में प्राप्त राशि के लिए सेवाएं प्रदान करने हेतु जिम्मेदार होगा।</p>
                <p className="mt-2 font-medium">Pay close attention —</p>
                <p className="mt-1">Dear Client, your payments will be accepted only if you use the account information listed on the Monexaa Research website. We do not accept any payment in any other accounts besides Monexaa Research. Monexaa Research will only be liable to provide services for the amounts received in its account.</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8 text-sm text-white border-white">
          <p className="text-center">&copy; {new Date().getFullYear()} Monnexaa Research Private Limited. All rights reserved.
            <button
              type="button"
              onClick={() => setShowDesignerInfo(true)}
              className="block mt-1 text-sm text-white hover:underline mx-auto"
              aria-label="Open designer contact info"
            >
              Designed by Durgesh Rathor
            </button>
          </p>
        </div>
        {/* Designer info modal - fallback for users who cannot view LinkedIn */}
        {showDesignerInfo && (
          <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true" aria-label="Designer contact options">
            <div className="bg-white text-emerald-900 rounded-lg shadow-xl max-w-sm sm:max-w-md w-full p-4 mx-4 sm:mx-6">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold">Contact / Designer</h3>
                <button onClick={() => setShowDesignerInfo(false)} aria-label="Close" className="text-gray-600 hover:text-gray-900">✕</button>
              </div>
              <div className="mt-3 text-sm">
                <p className="mb-2">Contact Durgesh Rathor</p>
                <ul className="list-none space-y-2">
                  <li>
                    <a className="text-emerald-700 hover:underline" href="mailto:durgeshrathor05@gmail.com">durgeshrathor05@gmail.com</a>
                  </li>
                  <li>
                    <a className="text-emerald-700 hover:underline" href="tel:+917879946775">+91 78799 46775</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;

