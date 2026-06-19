import { algoliasearch } from 'algoliasearch'
import { buildContentIndex } from './content-index'

interface AlgoliaRecord extends Record<string, unknown> {
  objectID: string
  version: string
  slug: string
  title: string
  heading: string
  headingId: string
  content: string
  lvl: 1 | 2 | 3
  url: string
}

export async function pushAlgoliaIndex(
  docsDir: string,
  allVersions: string[],
  searchConfig: { appId: string; apiKey: string; indexName: string }
) {
  const client = algoliasearch(searchConfig.appId, searchConfig.apiKey)

  const contentIndex = await buildContentIndex(docsDir, allVersions)
  const records: AlgoliaRecord[] = []

  for (const doc of contentIndex.docs) {
    for (const version of doc.versions) {
      for (const heading of doc.headings) {
        records.push({
          objectID: `${version}/${doc.slug.join('/')}#${heading.id}`,
          version,
          slug: doc.slug.join('/'),
          title: doc.title,
          heading: heading.text,
          headingId: heading.id,
          content: heading.text,
          lvl: (heading.depth >= 1 && heading.depth <= 3 ? heading.depth : 2) as 1 | 2 | 3,
          url: `/docs/${version}/${doc.slug.join('/')}#${heading.id}`,
        })
      }
    }
  }

  await client.replaceAllObjects({
    indexName: searchConfig.indexName,
    objects: records,
  })
  console.log(`Indexed ${records.length} records to Algolia (${searchConfig.indexName})`)
}
