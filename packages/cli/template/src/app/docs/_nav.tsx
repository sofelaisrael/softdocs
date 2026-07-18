"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@sofelaisrael/ui";

const links = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
];

export function DocNav() {
  const pathname = usePathname();

  return (
    <nav className="inner-nav">
      <div className="nav-inner">
        <div className="nav-left">
          <Link href="/" className="nav-logo">
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
          <div className="nav-links">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? "active" : ""}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="nav-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
