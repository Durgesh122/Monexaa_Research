import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Demo/sample events removed — component will show the widget (or fetched events) and allow custom events.
const sampleEvents = [];

function formatLocal(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch (e) {
    return iso;
  }
}

function ImpactBadge({ level }) {
  const map = {
    High: { bg: '#FFECEF', color: '#B02A37' },
    Medium: { bg: '#FFFAEB', color: '#B57B00' },
    Low: { bg: '#F2F8F6', color: '#0F8B6E' }
  };
  const s = map[level] || map.Low;
  return (
    <span style={{ background: s.bg, color: s.color, padding: '6px 8px', borderRadius: 999, fontWeight: 700, fontSize: 12 }}>
      {level}
    </span>
  );
}

export default function EconomicCalendar() {
  const [events, setEvents] = useState(sampleEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [customEvents, setCustomEvents] = useState([]);
  const [form, setForm] = useState({ time: '', country: '', impact: 'Medium', title: '', actual: '-', forecast: '-', previous: '-' });
  // configurable widget URL (falls back to Myfxbook widget)
  const widgetSrc = process.env.REACT_APP_MYFX_WIDGET_URL || 'https://widget.myfxbook.com/widget/calendar.html';

  useEffect(() => {
    let mounted = true;

    async function fetchEvents() {
      setLoading(true);
      setError(null);

      // Configurable via env vars. Example providers: TradingEconomics, Finnhub, etc.
      const baseUrl = process.env.REACT_APP_ECON_API_URL || '';
      const apiKey = process.env.REACT_APP_ECON_API_KEY || '';

      if (!baseUrl) {
        // No API configured — keep sample data
        setLoading(false);
        return;
      }

      try {
        // Build request — consumers should set REACT_APP_ECON_API_URL to a working endpoint
        // and REACT_APP_ECON_API_KEY if required by the provider.
        const params = new URLSearchParams();
        if (apiKey) params.set('c', apiKey);
        // optional: restrict to next 7 days
        const start = new Date().toISOString().slice(0, 10);
        const end = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10);
        params.set('start', start);
        params.set('end', end);

        const url = baseUrl + (baseUrl.includes('?') ? '&' : '?') + params.toString();

        const res = await fetch(url, { method: 'GET' });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();

        // Map provider response to our event shape. Be defensive about fields.
        if (!mounted) return;

        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.slice(0, 50).map((d, i) => ({
            id: d.id || d.EventId || d.eventId || i,
            time: d.date || d.date_time || d.time || d.datetime || d.ts || d.timestamp || d.Date || '',
            country: d.country || d.country_code || d.symbol || (d.location || '').toUpperCase() || '—',
            impact: d.impact || d.importance || d.importanceLevel || d.importance_label || 'Medium',
            title: d.event || d.title || d.name || d.description || 'Event',
            actual: d.actual || d.act || d.value || '-',
            forecast: d.forecast || d.f || d.expected || '-',
            previous: d.previous || d.prev || d.previous_value || '-'
          }));

          setEvents(mapped);
        } else {
          // provider returned unexpected payload — keep sample data
          setError('API returned no events');
        }
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();

    const pollMinutes = Number(process.env.REACT_APP_ECON_POLL_MINUTES) || 5;
    const interval = setInterval(fetchEvents, Math.max(1, pollMinutes) * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // load custom events from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('econ_events');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCustomEvents(parsed);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  function saveCustomEvents(arr) {
    try {
      localStorage.setItem('econ_events', JSON.stringify(arr));
    } catch (e) {
      // ignore
    }
  }

  function addCustomEvent() {
    // basic validation
    const id = `custom-${Date.now()}`;
    const item = { ...form, id, custom: true };
    const next = [item, ...customEvents];
    setCustomEvents(next);
    saveCustomEvents(next);
    setForm({ time: '', country: '', impact: 'Medium', title: '', actual: '-', forecast: '-', previous: '-' });
    setShowForm(false);
  }

  function removeCustomEvent(id) {
    const next = (customEvents || []).filter((c) => c.id !== id);
    setCustomEvents(next);
    saveCustomEvents(next);
  }

  const containerRef = useRef(null);

  // Scrolling helpers: enable drag-to-pan and wheel-to-scroll mapping for the calendar wrapper
  function initScrollHandlers(container) {
    if (!container) return;
    // guard to avoid attaching multiple times
    if (container._initScrollHandlers) return;
    container._initScrollHandlers = true;

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    const onDown = (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX || (e.touches && e.touches[0].pageX) || 0;
      startY = e.pageY || (e.touches && e.touches[0].pageY) || 0;
      scrollLeft = container.scrollLeft;
      scrollTop = container.scrollTop;
    };

    const onMove = (e) => {
      if (!isDown) return;
      const x = e.pageX || (e.touches && e.touches[0].pageX) || 0;
      const y = e.pageY || (e.touches && e.touches[0].pageY) || 0;
      const dx = x - startX;
      const dy = y - startY;
      container.scrollLeft = scrollLeft - dx;
      container.scrollTop = scrollTop - dy;
    };

    const onUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const onWheel = (e) => {
      // if shift pressed, scroll horizontally by wheel dy
      if (e.shiftKey) {
        container.scrollLeft += e.deltaY;
      } else if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // prefer native horizontal delta when present
        container.scrollLeft += e.deltaX;
      } else {
        // otherwise scroll vertically
        container.scrollTop += e.deltaY;
      }
      // prevent default to avoid page scroll stealing when over the widget
      e.preventDefault();
    };

    // mouse events
    container.addEventListener('mousedown', onDown);
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseup', onUp);
    container.addEventListener('mouseleave', onUp);
    // touch events
    container.addEventListener('touchstart', onDown, { passive: true });
    container.addEventListener('touchmove', onMove, { passive: false });
    container.addEventListener('touchend', onUp);
    // wheel
    container.addEventListener('wheel', onWheel, { passive: false });

    // initial style
    container.style.cursor = 'grab';
    container.style.overflow = 'auto';
    container.style.webkitOverflowScrolling = 'touch';

    // provide a cleanup helper to remove handlers when needed
    container._removeInitScrollHandlers = () => {
      container.removeEventListener('mousedown', onDown);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseup', onUp);
      container.removeEventListener('mouseleave', onUp);
      container.removeEventListener('touchstart', onDown);
      container.removeEventListener('touchmove', onMove);
      container.removeEventListener('touchend', onUp);
      container.removeEventListener('wheel', onWheel);
      try {
        delete container._initScrollHandlers;
        delete container._removeInitScrollHandlers;
      } catch (e) {
        container._initScrollHandlers = false;
        container._removeInitScrollHandlers = null;
      }
    };
  }

  // Initialize scroll handlers when the container ref is set, and clean up on unmount/change
  useEffect(() => {
    const node = containerRef.current;
    if (node && !node._initScrollHandlers) initScrollHandlers(node);
    return () => {
      if (node && node._removeInitScrollHandlers) node._removeInitScrollHandlers();
    };
  }, [containerRef.current]);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading} className="animate-heading-loop">Economic Calendar</h2>
      <div style={styles.headingUnderline} aria-hidden="true" />
      <p style={styles.lead}>Upcoming macro events, central bank releases and data points to watch.</p>

      {loading && <div style={{ textAlign: 'center', marginBottom: 8 }}>Loading calendar…</div>}
      {error && <div style={{ color: '#B02A37', textAlign: 'center', marginBottom: 8 }}>Error loading calendar: {error}</div>}

      {/* If no external API configured, show the Myfxbook widget iframe (or configured widget) */}
      {!process.env.REACT_APP_ECON_API_URL ? (
        <div style={styles.widgetWrap}>
          <iframe
            src={widgetSrc}
            title="Economic Calendar Widget"
            loading="lazy"
            style={styles.iframe}
            frameBorder="0"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      ) : null}

      {/* Add Event UI removed per request */}

      {/* Scroll wrapper: allows mouse drag to pan and wheel-to-scroll (shift for horizontal) */}
      <div
        ref={containerRef}
        style={styles.tableWrap}
      >
        <div style={styles.table}>
          {([...(customEvents || []), ...(events || [])]).map((e, idx) => (
            <div key={e.id} style={styles.row}>
              <div style={{ flex: 2 }}>{formatLocal(e.time)}</div>
              <div style={{ flex: 1, fontWeight: 700 }}>{e.country}</div>
              <div style={{ flex: 1 }}><ImpactBadge level={e.impact} /></div>
              <div style={{ flex: 4 }}>{e.title}</div>
              <div style={{ flex: 2 }}>{e.actual}</div>
              <div style={{ flex: 2 }}>{e.forecast}</div>
              <div style={{ flex: 2 }}>{e.previous || '—'}</div>
              {e.custom ? (
                <div style={{ marginLeft: 8 }}>
                  <button onClick={() => removeCustomEvent(e.id)} style={styles.smallBtn}>Delete</button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12, textAlign: 'right' }}>
        {/* Open full calendar in a new tab. Use REACT_APP_FULL_CAL_URL if provided, otherwise open the widget URL. */}
        <a href={process.env.REACT_APP_FULL_CAL_URL || widgetSrc} target="_blank" rel="noopener noreferrer" style={styles.calendarLink}>
          View full economic calendar →
        </a>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: 24,
    maxWidth: 1100,
    margin: '0 auto',
    background: 'transparent'
  },
  heading: {
    fontSize: 24,
    fontWeight: 800,
    color: '#003E29',
    textAlign: 'center'
  },
  headingUnderline: {
    height: 4,
    width: 88,
    background: '#0F8B6E',
    margin: '6px auto 12px',
    borderRadius: 4,
    boxShadow: '0 6px 18px rgba(15,139,110,0.10)'
  },
  lead: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#334455'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  rowHeader: {
    display: 'flex',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 10,
    background: '#fff',
    border: '1px solid #e6eef0',
    fontWeight: 800,
    color: '#223344'
  },
  row: {
    display: 'flex',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 10,
    background: '#FFFFFF',
    border: '1px solid #e6eef0',
    alignItems: 'center'
  },
  calendarLink: {
    color: '#0F8B6E',
    fontWeight: 700,
    textDecoration: 'none'
  }
  ,
  primaryBtn: {
    background: '#0F8B6E',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700
  },
  smallBtn: {
    background: 'transparent',
    border: '1px solid #e6eef0',
    padding: '6px 8px',
    borderRadius: 8,
    cursor: 'pointer'
  },
  form: {
    background: '#fff',
    border: '1px solid #e6eef0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12
  },
  input: {
    padding: '8px 10px',
    borderRadius: 8,
    border: '1px solid #d9e6df'
  },
  select: {
    padding: '8px 10px',
    borderRadius: 8,
    border: '1px solid #d9e6df'
  }
  ,
  widgetWrap: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    border: '1px solid #e6eef0',
    background: '#fff'
  },
  iframe: {
    width: '100%',
    height: 420,
    border: 'none',
    display: 'block'
  }
};
