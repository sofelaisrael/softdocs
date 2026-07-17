import { pushAlgoliaIndex } from "@versio/core";
import path from "path";

const DOCS_DIR = path.resolve(process.cwd(), "docs");
const ALL_VERSIONS = ["1.0", "2.0", "3.0"];

const searchConfig = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
  apiKey:
    process.env.ALGOLIA_ADMIN_API_KEY ??
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ??
    "",
  indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? "versio",
};

async function main() {
  if (!searchConfig.appId || !searchConfig.apiKey) {
    console.error(
      "Missing Algolia credentials. Set NEXT_PUBLIC_ALGOLIA_APP_ID and NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY in .env.local",
    );
    process.exit(1);
  }

  console.log(`Indexing docs from ${DOCS_DIR}...`);
  console.log(`Versions: ${ALL_VERSIONS.join(", ")}`);
  console.log(`Algolia: ${searchConfig.indexName}`);

  const count = await pushAlgoliaIndex(DOCS_DIR, ALL_VERSIONS, searchConfig);
  console.log(
    `Indexed ${count} records to Algolia (${searchConfig.indexName})`,
  );
}

main().catch(console.error);
