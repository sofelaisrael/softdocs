"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface VersionPickerProps {
  versions: string[];
  currentVersion: string;
  currentSlug: string;
  versionIndex: Record<string, string[]>;
}

export function VersionPicker({
  versions,
  currentVersion,
  currentSlug,
  versionIndex,
}: VersionPickerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function select(v: string) {
    setOpen(false);
    if (v === currentVersion) return;
    const targetSlugs = versionIndex[v];
    if (targetSlugs && targetSlugs.includes(currentSlug)) {
      router.push(`/docs/${v}/${currentSlug}`);
    } else {
      router.push(`/docs/${v}`);
    }
  }

  return (
    <div ref={ref} className="version-picker-wrap">
      <button className="version-picker-btn" onClick={() => setOpen(!open)}>
        v{currentVersion}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="version-picker-menu">
          {versions.map((v) => (
            <button
              key={v}
              className={`version-picker-option${v === currentVersion ? " active" : ""}`}
              onClick={() => select(v)}
            >
              v{v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
