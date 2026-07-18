"use client";

import Link from "next/link";
import { ThemeToggle } from "@sofelaisrael/ui";

export function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <div className="nav-left">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-icon">
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
            </div>
            <span>versio</span>
            <span className="nav-logo-badge">BETA</span>
          </Link>

          <nav className="nav-links">
            <Link href="/docs">Documentation</Link>
            <Link href="/changelog" className="nav-changelog-link">
              Changelog <span className="nav-changelog-badge">v3.2</span>
            </Link>
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
            <span className="nav-search-shortcut">CtrlK</span>
          </div>
          <ThemeToggle />
          <Link
            href="/docs"
            className="btn btn-primary"
            style={{ padding: "0 16px", height: "36px", fontSize: "13.5px" }}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
