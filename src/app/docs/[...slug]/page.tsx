import { redirect } from "next/navigation";
import config from "@/softdocs.config";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function OldDocRedirect({ params }: Props) {
  const { slug } = await params;
  const first = slug[0];
  if (config.versions.all.includes(first)) {
    redirect(`/docs/${first}/getting-started`);
  }
  redirect(`/docs/${config.versions.default}/${slug.join("/")}`);
}
