'use client'

import { InstantSearch, SearchBox, Hits, useRefinementList } from 'react-instantsearch'
import { liteClient } from 'algoliasearch/lite'

interface HitProps {
  hit: {
    objectID: string
    version: string
    slug: string
    title: string
    heading: string
    content: string
    url: string
  }
}

function Hit({ hit }: HitProps) {
  return (
    <a href={hit.url} className="block px-3 py-2 hover:bg-accent/10">
      <div className="text-sm font-medium">{hit.heading}</div>
      <div className="text-xs text-muted">{hit.title} &middot; v{hit.version}</div>
    </a>
  )
}

function VersionFacet({ currentVersion }: { currentVersion: string }) {
  const { items, refine } = useRefinementList({ attribute: 'version' })

  return (
    <div className="flex gap-2 px-3 py-2 border-b border-border text-xs">
      {items.map((item) => (
        <label key={item.value} className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={item.isRefined}
            onChange={() => refine(item.value)}
          />
          v{item.value}
        </label>
      ))}
      <button
        className="ml-auto text-muted hover:text-foreground"
        onClick={() => items.forEach((i) => { if (i.isRefined) refine(i.value) })}
      >
        Clear
      </button>
    </div>
  )
}

interface SearchProps {
  currentVersion: string
  appId: string
  searchApiKey: string
  indexName: string
}

export function Search({ currentVersion, appId, searchApiKey, indexName }: SearchProps) {
  const searchClient = liteClient(appId, searchApiKey)

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      initialUiState={{
        [indexName]: {
          refinementList: { version: [currentVersion] },
        },
      }}
    >
      <SearchBox />
      <VersionFacet currentVersion={currentVersion} />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  )
}
