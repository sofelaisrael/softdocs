"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
      <Navbar />

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

      <Footer />
    </>
  );
}
