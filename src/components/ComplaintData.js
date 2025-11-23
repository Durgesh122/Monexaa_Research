import React, { useEffect, useState } from 'react';

export default function ComplaintData() {
  const rows = [
    ['1', 'Directly from Investors', '0', '0', '0', '0', '0', '0'],
    ['2', 'SEBI (SCORES)', '0', '0', '0', '0', '0', '0'],
    ['3', 'Other Sources (if any)', '0', '0', '0', '0', '0', '0']
  ];

  const headers = [
    'Sr. No.',
    'Received from',
    'Pending at the end of last month',
    'Received',
    'Resolved',
    'Pending',
    'Pending Complaints 3 Months',
    'Average Resolution time (in days)^'
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 640);
      }
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section style={styles.container} aria-labelledby="complaint-heading">
      <h2 id="complaint-heading" style={styles.heading}>Complaint Data for Oct 2025</h2>
      <div style={styles.lead}>Monthly complaint receipt and resolution statistics by source</div>

      <div style={styles.tableWrap}>
        {/* Always render table; apply compact styles on mobile */}
        {(() => {
          const tableStyle = isMobile ? { ...styles.table, ...styles.mobileTable } : styles.table;
          const thStyle = isMobile ? { ...styles.th, ...styles.mobileTh } : styles.th;
          const tdStyle = isMobile ? { ...styles.td, ...styles.mobileTd } : styles.td;

          return (
            <table style={tableStyle}>
              <thead>
                <tr>
                  {headers.map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((cell, i) => (
                      <td key={i} style={tdStyle}>{cell}</td>
                    ))}
                  </tr>
                ))}
                <tr style={styles.totalRow}>
                  <td style={tdStyle} colSpan={2}><strong>Grand Total</strong></td>
                  <td style={tdStyle}><strong>0</strong></td>
                  <td style={tdStyle}><strong>0</strong></td>
                  <td style={tdStyle}><strong>0</strong></td>
                  <td style={tdStyle}><strong>0</strong></td>
                  <td style={tdStyle}><strong>0</strong></td>
                  <td style={tdStyle}><strong>0</strong></td>
                </tr>
              </tbody>
            </table>
          );
        })()}
      </div>

      <div style={styles.footnote}>
        <div>*Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.</div>
      </div>
    </section>
  );
}

const styles = {
  container: { padding: '12px', maxWidth: '100%', margin: '14px auto', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  heading: { fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 800, color: '#003E29', textAlign: 'center' },
  lead: { color: '#334455', marginTop: 6, textAlign: 'center', fontSize: 'clamp(12px, 3vw, 14px)', padding: '0 8px' },
  caption: { textAlign: 'center', paddingBottom: 8, color: '#334455', fontWeight: 700 },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: 8, margin: '0 auto', border: '1px solid #e6eef0', borderRadius: 10, overflow: 'hidden', background: '#fff', tableLayout: 'auto' },
  th: { textAlign: 'center', padding: '10px 8px', border: '1px solid #e6eef0', background: '#fafafa', fontWeight: 800, color: '#223344', fontSize: 'clamp(11px, 2.2vw, 13px)', whiteSpace: 'normal', wordBreak: 'break-word' },
  td: { padding: '8px 6px', border: '1px solid #e6eef0', color: '#334455', textAlign: 'center', fontSize: 'clamp(11px, 2.2vw, 13px)', whiteSpace: 'normal', wordBreak: 'break-word' },
  totalRow: { background: '#fff' },
  footnote: { marginTop: 10, fontSize: 13, color: '#55606a', textAlign: 'center' },
  tableWrap: { overflowX: 'auto', marginTop: 12, borderRadius: 12, background: '#fff', padding: 8, boxShadow: '0 6px 18px rgba(15,139,110,0.04)', WebkitOverflowScrolling: 'touch' }
  ,
  /* Mobile compact table styles */
  mobileTable: { tableLayout: 'fixed', fontSize: '12px', minWidth: '900px' },
  mobileTh: { padding: '6px 6px', fontSize: '12px' , whiteSpace: 'normal', wordBreak: 'break-word' },
  mobileTd: { padding: '6px 6px', fontSize: '12px', whiteSpace: 'normal', wordBreak: 'break-word' }
};
