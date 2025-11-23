import React from 'react';
import { Link } from 'react-router-dom';

const sampleInsights = [
  {
    id: 1,
    title: 'Market Sentiment',
    excerpt: 'Measure bullish vs bearish flows, positioning and short-term risk appetite across major markets.',
  },
  {
    id: 2,
    title: 'Top Movers',
    excerpt: 'Daily leaders and laggards with on-chain and volume context to spot momentum trades.',
  },
  {
    id: 3,
    title: 'Sector Watch',
    excerpt: 'Sector rotation insights and which industries are leading the market this session.',
  },
  {
    id: 4,
    title: 'Macro Trends',
    excerpt: 'Key macro indicators and events shaping risk — rates, inflation, and central bank cues.',
  },
  {
    id: 5,
    title: 'Earnings Watch',
    excerpt: 'Preview of upcoming earnings, guidance signals and names to watch for volatility at open.',
  },
  {
    id: 6,
    title: 'Volatility Snapshot',
    excerpt: 'Real-time implied vs realized volatility trends and hedging flows across major indices.',
  },
];

export default function MarketInsights() {
  return (
    <div style={styles.page} aria-labelledby="market-insights-heading">
      <h2 id="market-insights-heading" style={styles.heading} className="animate-heading-loop">Market Insights</h2>
      <div style={styles.headingUnderline} aria-hidden="true" />
      <p style={styles.lead}>Curated market commentary and trade ideas — quick to read, easy to act on.</p>

      <div style={styles.grid}>
        {sampleInsights.map((item) => (
          <article key={item.id} style={styles.card}>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardExcerpt}>{item.excerpt}</p>
            </div>
            <div style={styles.cardCTA}>
                <Link to="/market-insights" style={styles.readMore}>{getCtaText(item)}</Link>
              </div>
          </article>
        ))}
      </div>
    </div>
  );
}

  // SEO-friendly CTA phrases per insight
  function getCtaText(item) {
    const map = {
      'Market Sentiment': 'Explore market sentiment analysis & positioning report →',
      'Top Movers': 'Discover top movers — volume, momentum & trade ideas →',
      'Sector Watch': 'Sector rotation insights & leading industry calls →',
      'Macro Trends': 'Macro trends: rates, inflation & market impact →',
      'Earnings Watch': 'Earnings preview, guidance signals & volatility plays →',
      'Volatility Snapshot': 'Volatility snapshot — IV vs realized & hedging flows →',
    };

    return map[item.title] || 'Read full analysis & trade ideas →';
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
  card: {
    background: '#FFFFFF',
    borderRadius: 12,
    border: '1px solid #e6eef0',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 160ms ease, box-shadow 160ms ease',
    cursor: 'default',
  },
  cardBody: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0b2b28'
  },
  cardExcerpt: {
    marginTop: 8,
    color: '#556677',
    fontSize: 14,
  },
  cardCTA: {
    textAlign: 'right'
  },
  readMore: {
    color: '#0F8B6E',
    fontWeight: 700,
    textDecoration: 'none'
  }
};
