'use client';

export default function PricingPage() {
  function toggleBilling(period: string) {
    document.querySelectorAll('.toggle-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-period') === period);
    });

    // Update monthly/yearly prices — fix: only update the amount span, not the whole price
    const prices = document.querySelectorAll('.plan-price');
    prices.forEach(function (el) {
      const amount = el.querySelector('.amount');
      if (!amount) return; // Skip "Custom" pricing
      const newVal = period === 'monthly'
        ? amount.getAttribute('data-monthly')
        : amount.getAttribute('data-yearly');
      if (newVal) amount.textContent = newVal;
    });
  }

  return (
    <>
      {/* ===== NAV ===== */}
      <nav className="inner-nav pricing-nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
              <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            SoftDocs
          </a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/docs">Docs</a>
            <a href="/components">Components</a>
            <a href="/pricing" className="active">Pricing</a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="pricing-hero">
        <h1>Simple, predictable pricing</h1>
        <p>Start for free. Upgrade when your docs team grows. No hidden fees, no surprise bills.</p>
        <div className="toggle-wrap">
          <button className="toggle-btn active" data-period="monthly" onClick={() => toggleBilling('monthly')}>Monthly</button>
          <button className="toggle-btn" data-period="yearly" onClick={() => toggleBilling('yearly')}>Yearly</button>
        </div>
        <div className="toggle-save">Save 20% with annual billing</div>
      </section>

      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div className="plans">
          {/* Free */}
          <div className="plan-card">
            <div className="plan-name">Starter</div>
            <div className="plan-price">
              <span className="currency">$</span><span className="amount" data-monthly="0" data-yearly="0">0</span><span className="period">/month</span>
            </div>
            <div className="plan-desc">Everything you need to try SoftDocs on a personal project.</div>
            <a href="#" className="plan-cta primary">Get Started</a>
            <ul className="plan-features">
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> 1 documentation site</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> 50 pages</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Algolia search</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> 1 version</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Community support</li>
              <li><svg className="check missing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> Custom domain</li>
              <li><svg className="check missing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> Analytics</li>
            </ul>
          </div>

          {/* Pro (featured) */}
          <div className="plan-card featured">
            <div className="plan-badge">Most popular</div>
            <div className="plan-name">Pro</div>
            <div className="plan-price">
              <span className="currency">$</span><span className="amount" data-monthly="29" data-yearly="23">29</span><span className="period">/month</span>
            </div>
            <div className="plan-desc">For teams that need professional documentation with full control.</div>
            <a href="#" className="plan-cta primary">Get Started</a>
            <ul className="plan-features">
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> 5 documentation sites</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Unlimited pages</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Algolia search</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Unlimited versions</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Custom domains</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Analytics dashboard</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Email support</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="plan-card">
            <div className="plan-name">Enterprise</div>
            <div className="plan-price">
              <span style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--fg)' }}>Custom</span>
            </div>
            <div className="plan-desc">For organizations with advanced security, compliance, and scale requirements.</div>
            <a href="#" className="plan-cta secondary">Contact Sales</a>
            <ul className="plan-features">
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Unlimited sites</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> SSO / SAML</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> SLA guarantee</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Dedicated support</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> On-premise deployment</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Custom branding</li>
              <li><svg className="check inc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Security audit</li>
            </ul>
          </div>
        </div>

        {/* ===== FAQ ===== */}
        <section className="faq">
          <h2>Frequently asked questions</h2>
          <div className="faq-grid">
            {[
              { q: 'Can I start for free and upgrade later?', a: 'Yes. The Starter plan is free forever. Upgrade to Pro when you need custom domains, analytics, or more sites. Your docs carry over — no migration needed.' },
              { q: 'What happens when I hit the page limit?', a: 'On the Starter plan, you are capped at 50 pages. Upgrade to Pro for unlimited pages — your existing content stays, you just add more.' },
              { q: 'Do you offer discounts for open source?', a: 'Yes. Open source projects and non-profits get the Pro plan free. Email us at opensource@softdocs.dev with your project details.' },
              { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no cancellation fees. Your site stays live until the end of your billing period. Downgrade to Starter anytime.' },
              { q: 'Is my data secure?', a: 'All sites are served over HTTPS with automatic SSL. Enterprise plans include SSO, audit logs, and on-premise deployment options.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans. Invoices are available for all paid plans.' },
            ].map((faq) => (
              <div key={faq.q} className="faq-item">
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="pricing-footer">
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)' }}>
            <span>&copy; {new Date().getFullYear()} SoftDocs</span>
            <span>All plans include a 14-day money-back guarantee.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
