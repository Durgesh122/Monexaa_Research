import React, { useEffect, useRef } from 'react';

// Continuous alert/ticker shown near top of page (hidden on small screens)
export default function AlertBanner({ messages, top, speed = 60 } ) {
  const msgs = messages && messages.length ? messages : [
    'Investment/Trading in Securities Market is subject to market risk. Read all the related documents carefully before investing. Please read document of our privacy policy, terms of use & disclaimer on our website. We do not provide any guaranteed or assured return services, profit sharing services, Demat Account services, Investment related services or any other services which are not mentioned at our website.'
  ];

  // Duplicate messages so the track can loop continuously
  const loop = msgs.concat(msgs);

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Compute translate distance and animation duration based on content width
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const compute = () => {
      // track.scrollWidth contains the width of the duplicated content
      const total = track.scrollWidth || 0;
      // We duplicated msgs, so one full cycle distance is half the scrollWidth
      const oneCycle = Math.max(0, Math.floor(total / 2));
      const gap = 64; // extra gap (px) between end and restart
      const translate = oneCycle + gap;
      // Speed: pixels per second (adjust via prop). Lower = slower.
      const pxPerSecond = typeof speed === 'number' && speed > 0 ? speed : 60;
      const duration = Math.max(6, Math.round((translate / pxPerSecond) * 10) / 10); // seconds, min 6s, 0.1s precision

      track.style.setProperty('--marquee-translate', `-${translate}px`);
      track.style.setProperty('--marquee-duration', `${duration}s`);
    };

    // Initial compute and on resize
    compute();
    let rAF;
    const onResize = () => {
      // debounce with rAF
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(compute);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, [msgs.join('|'), speed]);

  const style = top !== undefined ? { position: 'fixed', left: 0, right: 0, top: top, zIndex: 98 } : undefined;
  return (
    <div ref={containerRef} className="alert-banner" role="region" aria-label="Site alerts" style={style}>
      <div ref={trackRef} className="alert-track" aria-hidden="false">
        {loop.map((m, i) => (
          <div className="alert-item" key={i}>{m}</div>
        ))}
      </div>
    </div>
  );
}
