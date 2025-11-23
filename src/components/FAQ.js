import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      q: 'Is the information on this site investment advice?',
      a: 'No. The information provided is for educational and informational purposes only and does not constitute investment advice, recommendation, or an offer to buy or sell any financial instruments. Always consult a licensed financial advisor before making investment decisions.'
    },
    {
      q: 'How do you handle client complaints and grievance redressal?',
      a: 'We follow SEBI guidelines for grievance redressal. Clients can raise complaints via the contact details below. We maintain a documented process to track, escalate and resolve complaints within prescribed timelines.'
    },
    {
      q: 'What are the risks of trading?',
      a: 'Trading in equities, derivatives, commodities or currencies involves the risk of loss. Past performance is not indicative of future results. You may lose part or all of your capital. Make sure you understand the risks and trade only with capital you can afford to lose.'
    },
    {
      q: 'Do you perform KYC and AML checks?',
      a: 'Yes. We comply with KYC (Know Your Customer) and AML (Anti Money Laundering) regulations as mandated by SEBI and other authorities. Clients must provide valid identity and address proof before account activation.'
    },
    {
      q: 'Where can I find SEBI resources and investor protections?',
      a: 'For official information, investor education materials and complaint procedures, visit the SEBI website: https://www.sebi.gov.in. You may also refer to the SCORES portal for filing grievances.'
    }
  ];

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section style={styles.container} aria-labelledby="faq-heading">
      <h2 id="faq-heading" style={styles.heading}>Frequently Asked Questions (Investor Guidance)</h2>
      <div style={styles.lead}>Important disclosures and investor information — prepared in line with SEBI guidance.</div>

      <div style={styles.list}>
        {items.map((it, i) => (
          <div key={i} style={styles.item}>
            <button
              aria-expanded={openIndex === i}
              aria-controls={`faq-panel-${i}`}
              onClick={() => toggle(i)}
              style={styles.q}
            >
              <span>{it.q}</span>
              <span style={styles.caret}>{openIndex === i ? '−' : '+'}</span>
            </button>

            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-heading`}
              style={{ ...styles.a, display: openIndex === i ? 'block' : 'none' }}
            >
              {it.a}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <strong>Risk Disclosure:</strong> Trading and investments involve risk. Read all product documents and disclosures carefully before investing.
        <div style={{ marginTop: 8 }}>
          <strong>Grievance / Support:</strong> For complaints, contact us at <a href="mailto:support@monexaaresearch.com" style={styles.link}>support@monexaaresearch.com</a> or call our helpline at <span style={styles.phone}>+91 6232678136</span>.
        </div>

        <div style={{ marginTop: 12, background: 'transparent', color: '#334455' }}>
          <strong>Compliance:</strong>
          <div style={{ marginTop: 6 }}>
            This website is for informational purposes only and does not allege that any person or entity is violating SEBI rules. Monexaa Research complies with all applicable laws and regulations, including SEBI guidelines. If you have a complaint, please use the grievance contact details provided above.
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: 24,
    maxWidth: 1100,
    margin: '18px auto',
    background: 'transparent'
  },
  heading: {
    fontSize: 22,
    fontWeight: 800,
    color: '#003E29',
    textAlign: 'center'
  },
  lead: {
    textAlign: 'center',
    marginTop: 8,
    color: '#334455'
  },
  list: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  item: {
    borderRadius: 10,
    border: '1px solid #e6eef0',
    overflow: 'hidden',
    background: '#FFFFFF'
  },
  q: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 15,
    color: '#223344'
  },
  caret: {
    marginLeft: 12,
    fontSize: 20
  },
  a: {
    padding: '12px 16px',
    color: '#334455',
    lineHeight: 1.5,
    background: '#fff'
  },
  footer: {
    marginTop: 12,
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid #e6eef0',
    background: '#fff',
    color: '#334455'
  },
  link: { color: '#0F8B6E', textDecoration: 'none', fontWeight: 700 },
  phone: { fontWeight: 800 }
};
