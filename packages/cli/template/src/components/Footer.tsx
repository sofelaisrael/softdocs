import Link from "next/link";

export function Footer() {
  return (
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
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li>
                <Link href="/#features">Features</Link>
              </li>
              <li>
                <Link href="/docs">Documentation</Link>
              </li>
              <li>
                <Link href="/changelog">Changelog</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="/docs/2.0/getting-started">Getting Started</Link>
              </li>
              <li>
                <Link href="/docs/2.0/configuration">Configuration</Link>
              </li>
              <li>
                <Link href="/docs/2.0/guides/custom-mdx">Custom MDX</Link>
              </li>
              <li>
                <a
                  href="https://github.com/versio/versio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/docs/2.0/getting-started">Getting Started</Link>
              </li>
              <li>
                <a
                  href="https://github.com/versio/versio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:hello@versio.dev">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} Versio Labs, Inc. &bull; MIT
            Licensed
          </span>
          <span>Built with React, TypeScript, and MDX.</span>
        </div>
      </div>
    </footer>
  );
}
