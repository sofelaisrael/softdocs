import { redirect } from "next/navigation";
import config from "@/softdocs.config";

export default function DocsPage() {
  redirect(`/docs/${config.versions.latest}`);
}
