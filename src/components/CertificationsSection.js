import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: '/assest/image/ssl1.png' },
  { src: '/assest/image/qva1.png' },
  { src: '/assest/image/nsic1.png' },
  { src: '/assest/image/msme1.png' },
  { src: '/assest/image/ioslogo1.png' },
  { src: '/assest/image/gaaf_logo1.png' },
];

const CertificationsSection = () => {
  const localized = [
    { name: 'SSL Certified', short: 'Secure connection', about: 'SSL encryption ensures secure data transmission.' },
    { name: 'QVA', short: 'Quality Verified', about: 'Quality assurance and verification accreditation.' },
    { name: 'NSIC', short: 'NSIC Registered', about: 'Registered with National Small Industries Corporation.' },
    { name: 'MSME', short: 'MSME Registered', about: 'Micro, Small & Medium Enterprises registration.' },
    { name: 'ISO', short: 'ISO Certified', about: 'International Organization for Standardization certification.' },
    { name: 'GAAF', short: 'GAAF Member', about: 'Member of the Global Association for Accredited Firms.' },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="mb-6 rounded-2xl p-4 sm:p-6 shadow-2xl" 
          style={{ 
            background: '#fff', 
            boxShadow: '0 8px 32px 0 rgba(21,128,61,0.18), 0 1.5px 8px 0 rgba(21,128,61,0.10)' 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ color: '#000' }}>
            <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 800, color: '#003E29', textAlign: 'center', marginBottom: '16px' }}>
              We are Certified By
            </h2>

            {/* Single-line horizontal scroller for certification logos */}
            <div className="w-full py-2 px-2">
              <div
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory items-center justify-start px-2 sm:justify-center"
                style={{ WebkitOverflowScrolling: 'touch' }}
                aria-label="Certification logos scroll"
              >
                {images.map((img, idx) => {
                  const L = localized[idx] || {};
                  const resolvedSrc = process.env.PUBLIC_URL + img.src;
                  return (
                    <motion.div
                      key={idx}
                      className="cursor-pointer flex-none min-w-[120px] sm:min-w-[160px] p-1 sm:p-2 flex flex-col items-center snap-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                      tabIndex={0}
                      initial={{ y: 0 }}
                      whileHover={{ y: -6, scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    >
                      <div 
                        className="relative inline-block w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full p-1 bg-white overflow-hidden" 
                        style={{ 
                          boxShadow: '0 6px 18px rgba(21,128,61,0.06)', 
                          boxSizing: 'border-box' 
                        }}
                      >
                        <motion.div
                          className="relative z-10 rounded-full flex items-center justify-center bg-white overflow-hidden"
                          style={{ 
                            minHeight: '100%', 
                            width: '100%', 
                            height: '100%', 
                            boxSizing: 'border-box' 
                          }}
                          whileHover={{ scale: 1.06, rotate: 3 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        >
                          {resolvedSrc ? (
                            <img
                              src={resolvedSrc}
                              alt={L.name || ''}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const ph = document.createElement('div');
                                ph.className = 'text-xs text-green-700 text-center';
                                ph.textContent = L.name || 'logo';
                                e.currentTarget.parentNode.appendChild(ph);
                              }}
                              className="max-w-full max-h-full object-contain block"
                              style={{ 
                                width: 'auto', 
                                height: '70%', 
                                maxWidth: '80%', 
                                maxHeight: '80%' 
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-green-700 rounded-full">
                              {L.name || 'logo'}
                            </div>
                          )}
                        </motion.div>
                      </div>

                      <div className="mt-3 text-center">
                        <p className="font-semibold text-sm sm:text-base" style={{ color: '#15803d' }}>
                          {L.name || ''}
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#000' }}>
                          {L.short || ''}
                        </p>
                      </div>

                      <div className="mt-2 sm:hidden px-2">
                        <div className="text-center text-xs" style={{ color: '#000' }}>
                          {L.about || ''}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <p 
              className="text-center text-sm sm:text-base mt-6 max-w-3xl mx-auto" 
              style={{ color: '#000' }}
            >
              Recognized and certified by industry-leading organizations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
