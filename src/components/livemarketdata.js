import React, { useEffect, useState, useRef } from "react";
import { FaChartLine, FaBitcoin, FaOilCan, FaDollarSign, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SiAirtable } from "react-icons/si";
import TradingViewTicker from './TradingViewTicker';

const markets = [
  { name: "NIFTY 50", icon: <FaChartLine size={20} /> },
  { name: "BANK NIFTY", icon: <SiAirtable size={20} /> },
  { name: "GOLD", icon: <FaBitcoin size={20} /> },
  { name: "CRUDE OIL", icon: <FaOilCan size={20} /> },
  { name: "USD/INR", icon: <FaDollarSign size={20} /> },
  { name: "SENSEX", icon: <FaChartLine size={20} /> },
  { name: "RELIANCE", icon: <FaChartLine size={20} /> },
  { name: "TCS", icon: <FaChartLine size={20} /> },
  { name: "HDFCBANK", icon: <FaChartLine size={20} /> },
  { name: "ICICIBANK", icon: <FaChartLine size={20} /> },
];

const demoData = {
  "NIFTY 50": 24123.96,
  "BANK NIFTY": 51234.98,
  GOLD: 64482.96,
  "CRUDE OIL": 93.5,
  "USD/INR": 83.24,
  SENSEX: 80700.12,
  RELIANCE: 2350.45,
  TCS: 3450.20,
  HDFCBANK: 1550.75,
  ICICIBANK: 920.35,
};

function LiveMarketDemo() {
  const [data, setData] = useState(demoData);
  // Lazy-load the TradingView iframe to reduce chance of message-channel
  // races caused by third-party widgets or extensions during initial load.
  const [showTicker, setShowTicker] = useState(false);
  const [tickerLoaded, setTickerLoaded] = useState(false);
  const [tickerFailed, setTickerFailed] = useState(false);
  const tickerTimerRef = useRef(null);

  // Fake auto refresh (random change every few seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setData((old) => {
        let updated = { ...old };
        Object.keys(updated).forEach((key) => {
          const rand = Number((Math.random() * 2 - 1).toFixed(2)); // -1 to +1 (number)
          const previous = Number(old[key]);
          // Sum as numbers, round to 2 decimals and store as a Number
          updated[key] = Number((previous + rand).toFixed(2));
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // TradingViewTicker component is rendered in JSX below
  useEffect(() => {
    const t = setTimeout(() => setShowTicker(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // When the ticker is shown, start a load timeout — if the iframe (or its
  // websocket) doesn't connect within a few seconds, show a simple fallback
  // to avoid repeated console errors and a blank area.
  useEffect(() => {
    if (!showTicker) return undefined;
    setTickerLoaded(false);
    setTickerFailed(false);
    // give TradingView up to 8s to load its websocket/data
    tickerTimerRef.current = setTimeout(() => {
      setTickerFailed(true);
    }, 8000);

    return () => {
      if (tickerTimerRef.current) clearTimeout(tickerTimerRef.current);
      tickerTimerRef.current = null;
    };
  }, [showTicker]);

  const handleTickerLoad = () => {
    setTickerLoaded(true);
    setTickerFailed(false);
    if (tickerTimerRef.current) {
      clearTimeout(tickerTimerRef.current);
      tickerTimerRef.current = null;
    }
  };

  const handleTickerError = () => {
    setTickerFailed(true);
    if (tickerTimerRef.current) {
      clearTimeout(tickerTimerRef.current);
      tickerTimerRef.current = null;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading} className="animate-heading-loop">"Live Market Updates"</h2>
      <p style={styles.subHeading}>Real-time market insights — fast, reliable, and action-ready.</p>
      <div style={styles.headingUnderline} aria-hidden="true" />

      <div style={{ marginBottom: '20px' }}>
        {showTicker && !tickerFailed ? (
          <TradingViewTicker onLoad={handleTickerLoad} onError={handleTickerError} />
        ) : null}

        {tickerFailed ? (
          <div style={{ padding: '6px 10px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #e6eef0' }}>
            <small style={{ color: '#333', fontWeight: 600, display: 'block', textAlign: 'center' }}>Live ticker unavailable — showing demo data</small>
            <div style={{ display: 'flex', gap: 10, marginTop: 8, overflowX: 'auto' }}>
              {Object.keys(data).slice(0, 8).map((k) => (
                <div key={k} style={{ minWidth: 90, padding: '6px 8px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #d9e6df', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{k}</div>
                  <div style={{ marginTop: 6, color: '#0F8B6E', fontWeight: 700, fontSize: 13 }}>₹ {data[k]}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Market button bar (horizontal, click -> open TradingView chart) */}
      <MarketButtonBar data={data} />

      {/* Render first items in the grid, and center the last three items */}
      {(() => {
        const firstItems = markets.slice(0, Math.max(0, markets.length - 3));
        const lastThree = markets.slice(-3);
        return (
          <>
            <div style={styles.grid}>
              {firstItems.map((m) => (
                <div key={m.name} style={styles.card}>
                  <div style={styles.icon}>{m.icon}</div>
                  <h3 style={styles.title}>{m.name}</h3>
                  <p style={styles.price}>₹ {data[m.name]}</p>
                </div>
              ))}
            </div>

            <div style={styles.centerRow}>
              {lastThree.map((m) => (
                <div key={m.name} style={styles.card}>
                  <div style={styles.icon}>{m.icon}</div>
                  <h3 style={styles.title}>{m.name}</h3>
                  <p style={styles.price}>₹ {data[m.name]}</p>
                </div>
              ))}
            </div>
          </>
        );
      })()}
    </div>
  );
}

const styles = {
  container: {
    padding: "clamp(16px, 5vw, 20px)",
    background: "transparent",
    borderRadius: "12px",
    marginTop: "20px",
  },
  heading: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "18px",
    color: "#003E29",
  },
  subHeading: {
    textAlign: 'center',
    color: '#0b3f36',
    fontSize: 14,
    margin: '6px auto 8px',
    maxWidth: 620,
    lineHeight: 1.4,
    fontWeight: 600
  },
  headingUnderline: {
    height: 4,
    width: 72,
    background: '#0F8B6E',
    margin: '6px auto 12px',
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(15,139,110,0.12)'
  },
      grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  card: {
    padding: "12px",
    borderRadius: "12px",
    background: "#FFFFFF",
    border: "1px solid #d9e6df",
    textAlign: "center",
    transition: "0.2s",
  },
  icon: { marginBottom: "8px", color: "#0F8B6E" },
  title: { fontSize: "15px", fontWeight: "600" },
  price: {
    marginTop: "8px",
    fontSize: "16px",
    fontWeight: "700",
    color: "#0F8B6E",
  },
  centerRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: 12,
    flexWrap: 'wrap'
  },
};

export default LiveMarketDemo;

function MarketButtonBar({ data }) {
  const scrollRef = useRef(null);

  const symbolMap = {
    'NIFTY 50': 'NSE:NIFTY',
    'BANK NIFTY': 'NSE:BANKNIFTY',
    GOLD: 'MCX:GOLD1!',
    'CRUDE OIL': 'NYMEX:CL1!',
    'USD/INR': 'FX_IDC:USDINR',
    SENSEX: 'BSE:SENSEX',
    RELIANCE: 'BSE:RELIANCE',
    TCS: 'BSE:TCS',
    HDFCBANK: 'BSE:HDFCBANK',
    ICICIBANK: 'BSE:ICICIBANK',
  };

  const scrollBy = (dir = 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.7) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const openChart = (market) => {
    const symbol = symbolMap[market];
    if (!symbol) return;
    const url = `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(symbol)}`;
    window.open(url, '_blank', 'noopener');
  };

  const sizeStyles = {
    sm: { padding: '6px 10px', fontSize: 12, minWidth: 90 },
    md: { padding: '10px 12px', fontSize: 14, minWidth: 120 },
    lg: { padding: '12px 14px', fontSize: 16, minWidth: 140 },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
      <button aria-label="scroll left" onClick={() => scrollBy(-1)} style={styles.arrowBtn}><FaChevronLeft /></button>
      <div ref={scrollRef} style={{ display: 'flex', overflowX: 'auto', gap: 12, padding: '6px 4px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', flex: 1 }}>
        {Object.keys(data).map((m) => (
          <button
            key={m}
            onClick={() => openChart(m)}
            style={{
              ...styles.marketButton,
              ...sizeStyles.md,
              scrollSnapAlign: 'start'
            }}
          >
            <div style={{ fontWeight: 700 }}>{m}</div>
            <div style={{ marginTop: 6, color: '#0F8B6E', fontWeight: 700 }}>₹ {data[m]}</div>
          </button>
        ))}
      </div>
      <button aria-label="scroll right" onClick={() => scrollBy(1)} style={styles.arrowBtn}><FaChevronRight /></button>

      
    </div>
  );
}

// extend styles object with button styles
styles.marketButton = {
  border: '1px solid #d9e6df',
  background: '#FFFFFF',
  borderRadius: 10,
  minWidth: 110,
  textAlign: 'center',
  cursor: 'pointer',
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

styles.arrowBtn = {
  background: 'transparent',
  border: '1px solid #e6eef0',
  borderRadius: 8,
  width: 32,
  height: 32,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};

// removed size button styles (no longer used)
