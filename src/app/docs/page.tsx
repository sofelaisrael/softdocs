import { redirect } from "next/navigation";
import { buildContentIndex } from "@softdocs/core";
import path from "path";
import config from "@/softdocs.config";

const DOCS_DIR = path.resolve(process.cwd(), "docs");

export default async function DocsPage() {
  const index = await buildContentIndex(DOCS_DIR, config.versions.all);
  const latestDocs = index.byVersion.get(config.versions.latest) ?? [];
  if (latestDocs.length > 0) {
    redirect(`/docs/${config.versions.latest}/${latestDocs[0].slug.join("/")}`);
  }
  redirect(`/docs/${config.versions.default}`);
}
