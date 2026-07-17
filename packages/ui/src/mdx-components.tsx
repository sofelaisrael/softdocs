"use client";

import { useState, type ReactNode } from "react";

export function Callout({
  type = "info",
  children,
}: {
  type?: string;
  children: ReactNode;
}) {
  return (
    <div className={`callout callout-${type}`}>
      <svg
        className="callout-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {type === "warning" ? (
          <>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </>
        ) : type === "tip" ? (
          <>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </>
        ) : (
          <circle cx="12" cy="12" r="10" />
        )}
      </svg>
      <div>{children}</div>
    </div>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <div className="steps">{children}</div>;
}

export function Step({ children }: { children: ReactNode }) {
  return (
    <div className="step">
      <div className="step-num" />
      <div className="step-body">{children}</div>
    </div>
  );
}

export function Tabs({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const tabs: { label: string; content: ReactNode }[] = [];

  const items = Array.isArray(children) ? children : [children];
  let idx = 0;
  for (const item of items) {
    if (
      item &&
      typeof item === "object" &&
      "props" in (item as React.ReactElement)
    ) {
      const el = item as React.ReactElement<{
        label?: string;
        children?: ReactNode;
      }>;
      if (el.props?.label) {
        tabs.push({ label: el.props.label, content: el.props.children });
      } else {
        tabs.push({ label: `Tab ${++idx}`, content: el.props?.children || el });
      }
    }
  }

  return (
    <div className="tabs">
      <div className="tab-bar">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`tab-btn${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={i} className={`tab-panel${i === active ? " active" : ""}`}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}

export function Tab({
  label: _label,
  children: _children,
}: {
  label: string;
  children: ReactNode;
}) {
  return null;
}

import { APITable } from "./components/APITable";
import { CodeBlock } from "./components/CodeBlock";

export const mdxComponents = {
  Callout,
  Steps,
  Step,
  Tabs,
  Tab,
  APITable,
  pre: CodeBlock,
};

export { APITable, CodeBlock };
