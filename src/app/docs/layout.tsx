import { DocNav } from "./_nav";
import Link from "next/link";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocNav />

      {children}

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link
                href="/"
                className="nav-logo"
                style={{
                  marginBottom: "var(--space-3)",
                  display: "inline-flex",
                }}
              >
                <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
                  <rect
                    x="2"
                    y="4"
                    width="24"
                    height="20"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M8 12h12M8 17h8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                SoftDocs
              </Link>
              <p>
                Turn Markdown into beautiful, searchable documentation sites.
                Built for teams who care about developer experience.
              </p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <Link href="/#features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/docs">Documentation</Link>
              <Link href="/components">Components</Link>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <Link href="/docs">Docs</Link>
              <Link href="/components">Component Library</Link>
              <a href="#">API Reference</a>
              <a href="#">GitHub</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} SoftDocs. Open source under MIT.
            </span>
            <span>Built with React, TypeScript, and MDX.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
