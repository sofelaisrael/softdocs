"use client";

import { ThemeToggle } from "@softdocs/ui";

export default function PricingPage() {
  function toggleBilling(period: string) {
    document.querySelectorAll(".toggle-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-period") === period);
    });
    const prices = document.querySelectorAll(".plan-price");
    prices.forEach(function (el) {
      const amount = el.querySelector(".amount") as HTMLElement | null;
      if (!amount) return;
      const newVal =
        period === "monthly"
          ? amount.getAttribute("data-monthly")
          : amount.getAttribute("data-yearly");
      if (newVal) amount.textContent = newVal;
    });
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <div className="nav-left">
            <a href="/" className="nav-logo">
              <div className="w-8 h-8 rounded-[10px] bg-[#1d1c1a] flex items-center justify-center shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  width="16"
                  height="16"
                  stroke="#faf8f3"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
              </div>
              <span>versio</span>
              <span className="nav-logo-badge">BETA</span>
            </a>
            <nav className="hidden lg:flex nav-links">
              <a href="/docs">Documentation</a>
              <a href="/components">Components</a>
              <a href="/pricing">Pricing</a>
              <a href="#" className="flex items-center gap-1.5">
                Changelog{" "}
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-sand text-ink-faint">
                  v3.2
                </span>
              </a>
            </nav>
          </div>
          <div className="nav-right">
            <div className="nav-search">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input type="search" placeholder="Search docs..." />
              <span className="text-[10px] text-ink-faint hidden sm:inline border border-line rounded px-1.5 py-0.5">
                CtrlK
              </span>
            </div>
            <ThemeToggle />
            <a
              href="#"
              className="btn btn-primary"
              style={{ padding: "0 16px", height: "36px", fontSize: "13.5px" }}
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      <section className="pricing-hero">
        <div className="container">
          <h1>
            Simple, <span className="hl">predictable</span> pricing.
          </h1>
          <p>
            Start for free. Upgrade when your docs team grows. No hidden fees,
            no surprise bills.
          </p>
          <div className="toggle-wrap">
            <button
              className="toggle-btn active"
              data-period="monthly"
              onClick={() => toggleBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className="toggle-btn"
              data-period="yearly"
              onClick={() => toggleBilling("yearly")}
            >
              Yearly
            </button>
          </div>
          <div className="toggle-save">Save 20% with annual billing</div>
        </div>
      </section>

      <div className="container">
        <div className="plans">
          <div className="plan-card">
            <div className="plan-name">Starter</div>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="amount" data-monthly="0" data-yearly="0">
                0
              </span>
              <span className="period">/month</span>
            </div>
            <div className="plan-desc">
              Everything you need to try Versio on a personal project.
            </div>
            <a href="#" className="plan-cta primary">
              Get Started
            </a>
            <ul className="plan-features">
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                1 documentation site
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                50 pages
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Built-in search
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                1 active version
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Community support
              </li>
              <li>
                <svg
                  className="check missing"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>{" "}
                Custom domain
              </li>
              <li>
                <svg
                  className="check missing"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>{" "}
                Analytics
              </li>
            </ul>
          </div>

          <div className="plan-card featured">
            <div className="plan-badge">Most popular</div>
            <div className="plan-name">Pro</div>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="amount" data-monthly="29" data-yearly="23">
                29
              </span>
              <span className="period">/month</span>
            </div>
            <div className="plan-desc">
              For teams that need professional documentation with full control.
            </div>
            <a href="#" className="plan-cta primary">
              Get Started
            </a>
            <ul className="plan-features">
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                5 documentation sites
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Unlimited pages
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Built-in search
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Unlimited versions
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Custom domains
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Analytics dashboard
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Email support
              </li>
            </ul>
          </div>

          <div className="plan-card">
            <div className="plan-name">Enterprise</div>
            <div className="plan-price">
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "var(--fg)",
                }}
              >
                Custom
              </span>
            </div>
            <div className="plan-desc">
              For organizations with advanced security, compliance, and scale
              requirements.
            </div>
            <a href="#" className="plan-cta secondary">
              Contact Sales
            </a>
            <ul className="plan-features">
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Unlimited sites
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                SSO / SAML
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                SLA guarantee
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Dedicated support
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                On-premise deployment
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Custom branding
              </li>
              <li>
                <svg
                  className="check inc"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                Security audit
              </li>
            </ul>
          </div>
        </div>

        <section style={{ padding: "4rem 0 5rem" }}>
          <h2 style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
            Frequently asked questions
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "var(--space-6)",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {[
              {
                q: "Can I start for free and upgrade later?",
                a: "Yes. The Starter plan is free forever. Upgrade to Pro when you need custom domains, analytics, or more sites. Your docs carry over, no migration needed.",
              },
              {
                q: "What happens when I hit the page limit?",
                a: "On the Starter plan, you are capped at 50 pages. Upgrade to Pro for unlimited pages. Your existing content stays, you just add more.",
              },
              {
                q: "Do you offer discounts for open source?",
                a: "Yes. Open source projects and non-profits get the Pro plan free. Email us at opensource@versio.dev with your project details.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. No contracts, no cancellation fees. Your site stays live until the end of your billing period. Downgrade to Starter anytime.",
              },
              {
                q: "Is my data secure?",
                a: "All sites are served over HTTPS with automatic SSL. Enterprise plans include SSO, audit logs, and on-premise deployment options.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans. Invoices are available for all paid plans.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="card"
                style={{ padding: "var(--space-5)" }}
              >
                <h3
                  style={{ fontSize: "15px", marginBottom: "var(--space-2)" }}
                >
                  {faq.q}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
                <span>versio</span>
              </div>
              <p>
                Versioned documentation framework for developer tools. Open
                source, MIT licensed.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="GitHub">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a href="#" aria-label="Discord">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="/docs">Documentation</a>
                </li>
                <li>
                  <a href="/components">Components</a>
                </li>
                <li>
                  <a href="/pricing">Pricing</a>
                </li>
                <li>
                  <a href="#">Changelog</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Migration guide</a>
                </li>
                <li>
                  <a href="#">Templates</a>
                </li>
                <li>
                  <a href="#">Examples</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">GitHub</a>
                </li>
                <li>
                  <a href="#">Discord</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Status</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} Versio Labs, Inc. &bull; MIT
              Licensed
            </span>
            <div className="flex gap-5">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
