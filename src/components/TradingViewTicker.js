import React, { useEffect, useState } from 'react';

// Keep the ticker below the header/topbar stacking context
// Header uses z ~99-100, so keep ticker lower than that.
const TICKER_ZINDEX = 80;

const TradingViewTicker = ({ fixed = false, onLoad, onError }) => {
  // Inline/top-of-navbar ticker (non-fixed) so it can be rendered inside Navbar
  // containerStyle will be defined later (after widgetHeight is known).

  const DEFAULT_WIDGET_HEIGHT = 46;

  const getHeightForWidth = (w) => {
    if (!w) return DEFAULT_WIDGET_HEIGHT;
    // Use compact heights on narrow screens so the ticker remains visible
    // without taking too much vertical space.
    if (w <= 360) return 56; // very small phones
    if (w <= 420) return 52; // small phones
    if (w <= 480) return 48; // phablets / narrow landscape
    return DEFAULT_WIDGET_HEIGHT;
  };

  const [widgetHeight, setWidgetHeight] = useState(DEFAULT_WIDGET_HEIGHT);
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    const app = document.documentElement && document.documentElement.getAttribute('data-reduce-motion') === 'true';
    const media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    return !!(app || media);
  });

  // Provide a harmless fallback in case a hot-update or old bundle
  // still references `isMobile`. This prevents an immediate
  // ReferenceError while the dev server/browser fully reloads.
  let isMobile = false;


  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setWidgetHeight(getHeightForWidth(w));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Watch for app-level reduce-motion toggles and media preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const update = () => {
      const mediaVal = mql ? mql.matches : false;
      const appVal = document.documentElement && document.documentElement.getAttribute('data-reduce-motion') === 'true';
      setPrefersReduced(!!(mediaVal || appVal));
    };

    if (mql) {
      if (mql.addEventListener) mql.addEventListener('change', update);
      else if (mql.addListener) mql.addListener(update);
    }

    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-reduce-motion') {
          update();
          break;
        }
      }
    });
    try { obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-reduce-motion'] }); } catch (e) {}

    update();
    return () => {
      if (mql) {
        if (mql.removeEventListener) mql.removeEventListener('change', update);
        else if (mql.removeListener) mql.removeListener(update);
      }
      obs.disconnect();
    };
  }, []);

  // Build the TradingView widget config dynamically so the embedded JSON height
  // matches the iframe height we set above. This prevents internal clipping
  // when the widget tries to render at a different height than the iframe.
  const widgetConfig = {
    symbols: [
      { description: 'NIFTY', proName: 'NSE:NIFTY' },
      { description: 'SENSEX', proName: 'BSE:SENSEX' },
      { description: 'BAJAJAUTO', proName: 'BSE:BAJAJ_AUTO' },
      { description: 'INFY', proName: 'BSE:INFY' },
      { description: 'HINDUNILVR', proName: 'BSE:HINDUNILVR' },
      { description: 'BAJAJFINSV', proName: 'BSE:BAJAJFINSV' },
      { description: 'DRREDDY', proName: 'BSE:DRREDDY' },
      { description: 'TCS', proName: 'BSE:TCS' },
      { description: 'HDFCBANK', proName: 'BSE:HDFCBANK' },
      { description: 'RELIANCE', proName: 'BSE:RELIANCE' },
      { description: 'NESTLEIND', proName: 'BSE:NESTLEIND' },
      { description: 'SUNPHARMA', proName: 'BSE:SUNPHARMA' },
      { description: 'ASIANPAINT', proName: 'BSE:ASIANPAINT' },
      { description: 'HCLTECH', proName: 'BSE:HCLTECH' },
      { description: 'BHARTIARTL', proName: 'BSE:BHARTIARTL' },
      { description: 'ULTRACEMCO', proName: 'BSE:ULTRACEMCO' },
      { description: 'ITC', proName: 'BSE:ITC' },
      { description: 'HDFC', proName: 'BSE:HDFC' },
      { description: 'TECHM', proName: 'BSE:TECHM' },
      { description: 'LT', proName: 'BSE:LT' },
      { description: 'INDUSINDBK', proName: 'BSE:INDUSINDBK' },
      { description: 'ICICIBANK', proName: 'BSE:ICICIBANK' },
      { description: 'KOTAKBANK', proName: 'BSE:KOTAKBANK' },
      { description: 'AXISBANK', proName: 'BSE:AXISBANK' },
    ],
    showSymbolLogo: true,
    colorTheme: 'light',
    isTransparent: false,
    displayMode: 'adaptive',
    width: '100%',
    height: widgetHeight,
    utm_source: 'wiseglobalresearch.com',
    utm_medium: 'widget',
    utm_campaign: 'ticker-tape',
    'page-uri': 'wiseglobalresearch.com/',
  };

  const iframeSrc = `https://s.tradingview.com/embed-widget/ticker-tape/?locale=in#${encodeURIComponent(
    JSON.stringify(widgetConfig),
  )}`;

  // Always render the ticker (including mobile) so it remains visible
  // across all device sizes.

  // Now that `widgetHeight` is initialized, build the container style.
  const containerStyle = {
    position: fixed ? 'sticky' : 'relative',
    top: fixed ? 0 : undefined,
    left: fixed ? 0 : undefined,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: `${widgetHeight}px`,
    background: 'var(--navbar-bg, #ffffff)',
    zIndex: TICKER_ZINDEX,
    boxShadow: fixed ? '0 2px 8px rgba(12,18,30,0.08)' : '0 2px 6px rgba(12,18,30,0.04)',
    borderBottom: '1px solid rgba(0,0,0,0.04)',
    minWidth: 0,
    boxSizing: 'border-box',
    overflow: 'visible',
    transition: prefersReduced ? 'none' : 'min-height 180ms ease',
  };

  const iframeEl = (
    <div
      className="tv-ticker"
      aria-hidden={false}
      role="region"
      aria-label="Market Ticker"
      style={containerStyle}
    >
      <iframe
        title="TradingView Ticker Tape"
        src={iframeSrc}
        className="w-full"
        onLoad={onLoad}
        onError={onError}
        style={{ width: '100%', height: `${widgetHeight}px`, border: 'none', display: 'block', minWidth: 0, transition: prefersReduced ? 'none' : 'height 180ms ease' }}
        loading="lazy"
        aria-hidden={false}
        referrerPolicy={prefersReduced ? 'no-referrer' : undefined}
      />
    </div>
  );

  if (fixed) {
    // When fixed, render a spacer where the component sits so page content
    // is pushed down and not covered by the fixed ticker, then render the
    // actual fixed-position ticker element.
    return (
      <>
        <div style={{ height: widgetHeight, width: '100%' }} aria-hidden="true" />
        {iframeEl}
      </>
    );
  }

  return iframeEl;
};

export default TradingViewTicker;
