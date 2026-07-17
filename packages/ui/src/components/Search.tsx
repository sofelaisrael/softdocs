"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  useRefinementList,
} from "react-instantsearch";
import { liteClient } from "algoliasearch/lite";

interface HitProps {
  hit: {
    objectID: string;
    version: string;
    slug: string;
    title: string;
    heading: string;
    content: string;
    url: string;
  };
}

function Hit({ hit }: HitProps) {
  return (
    <a href={hit.url} className="search-hit">
      <div className="search-hit-heading">{hit.heading}</div>
      <div className="search-hit-meta">
        {hit.title} &middot; v{hit.version}
      </div>
    </a>
  );
}

function VersionFacet() {
  const { items, refine } = useRefinementList({ attribute: "version" });

  return (
    <div className="search-facets">
      {items.map((item) => (
        <label key={item.value} className="search-facet">
          <input
            type="checkbox"
            checked={item.isRefined}
            onChange={() => refine(item.value)}
          />
          v{item.value}
        </label>
      ))}
      <button
        className="search-facet-clear"
        onClick={() =>
          items.forEach((i) => {
            if (i.isRefined) refine(i.value);
          })
        }
      >
        Clear
      </button>
    </div>
  );
}

interface SearchProps {
  currentVersion: string;
  appId: string;
  searchApiKey: string;
  indexName: string;
}

export function Search({
  currentVersion,
  appId,
  searchApiKey,
  indexName,
}: SearchProps) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const searchClient = useMemo(
    () => (appId ? liteClient(appId, searchApiKey) : null),
    [appId, searchApiKey],
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const input = document.querySelector(
          ".search-dialog .ais-SearchBox-input",
        ) as HTMLInputElement | null;
        input?.focus();
      }, 50);
    }
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  if (!appId || !searchClient) return null;

  return (
    <>
      <button
        className="search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Search docs (Cmd+K)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="search-trigger-text">Search</span>
        <kbd className="search-trigger-kbd">&#8984;K</kbd>
      </button>

      {open && (
        <div
          className="search-overlay"
          ref={overlayRef}
          onClick={(e) => {
            if (e.target === overlayRef.current) close();
          }}
        >
          <div className="search-dialog">
            <InstantSearch
              searchClient={searchClient}
              indexName={indexName}
              initialUiState={{
                [indexName]: {
                  refinementList: { version: [currentVersion] },
                },
              }}
            >
              <div className="search-dialog-header">
                <SearchBox />
                <button
                  className="search-close"
                  onClick={close}
                  aria-label="Close search"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <VersionFacet />
              <div className="search-dialog-results">
                <Hits hitComponent={Hit} />
              </div>
            </InstantSearch>
          </div>
        </div>
      )}
    </>
  );
}
