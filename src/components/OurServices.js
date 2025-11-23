import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaBullseye, FaMoneyCheckAlt, FaBookOpen, FaChartPie, FaHandshake } from 'react-icons/fa';
import { SiAirtable, SiGoogleanalytics } from 'react-icons/si';

// List of services with route paths that match App.js routes
const services = [
  { id: 'cash-positional', title: 'Cash Positional', desc: 'Long term positional ideas for cash market', icon: FaMoneyCheckAlt, path: '/services/cash-positional' },
  { id: 'elite-combo', title: 'Elite Combo', desc: 'Curated combos for advanced traders', icon: FaBullseye, path: '/services/elite-combo' },
  { id: 'equity-platniam', title: 'Equity Platinum', desc: 'Premium equity research & recommendations', icon: FaChartLine, path: '/services/equity-platniam' },
  { id: 'option-btst', title: 'Option BTST', desc: 'Buy Today Sell Tomorrow option strategies', icon: SiAirtable, path: '/services/option-btst' },
  { id: 'rapid-index', title: 'Rapid Index', desc: 'Fast intraday index signals', icon: FaChartPie, path: '/services/rapid-index' },
  { id: 'rapid-option', title: 'Rapid Option', desc: 'Quick option setups for intraday', icon: SiGoogleanalytics, path: '/services/rapid-option' },
  { id: 'stock-future', title: 'Stock Future', desc: 'High-conviction futures trades', icon: FaHandshake, path: '/services/stock-future' },
  { id: 'stock-option', title: 'Stock Option', desc: 'Stock-specific option ideas', icon: FaBookOpen, path: '/services/stock-option' },
];

export default function OurServices() {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading} className="animate-heading-loop">"Our Services"</h1>
      <div style={styles.headingUnderline} aria-hidden="true" />
      <p style={styles.lead}>Explore our services — click any card to go to the full details page.</p>

      <div style={styles.grid}>
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.id} to={s.path} style={styles.cardLink}>
              <div style={styles.card}>
                <div style={styles.iconWrap}><Icon size={32} color="#0F8B6E" /></div>
                <div style={styles.cardContent}>
                  <div style={styles.cardTitle}>{s.title}</div>
                  <div style={styles.cardDesc}>{s.desc}</div>
                </div>
                <div style={styles.cta}>View</div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

const styles = {
  page: {
    padding: '16px',
    maxWidth: 1100,
    margin: '0 auto',
  },
  heading: {
    fontSize: 'clamp(20px, 5vw, 28px)',
    fontWeight: 800,
    color: '#003E29',
    textAlign: 'center',
    marginBottom: 6,
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
    marginBottom: 18,
    color: '#334455',
    fontSize: 'clamp(14px, 3vw, 16px)',
    padding: '0 8px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 16,
  },
  cardLink: {
    textDecoration: 'none'
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    border: '1px solid #e6eef0',
    padding: 16,
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    transition: 'transform 0.14s ease, box-shadow 0.14s ease',
    cursor: 'pointer'
  },
  iconWrap: {
    width: 56,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F5F8F4',
    borderRadius: 10,
    flexShrink: 0
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0F8B6E'
  },
  cardDesc: {
    fontSize: 13,
    color: '#556677',
    marginTop: 6
  },
  cta: {
    fontSize: 13,
    color: '#0F8B6E',
    fontWeight: 700
  }
};
