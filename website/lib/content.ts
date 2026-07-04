import fs from "node:fs";
import path from "node:path";

export function getPageContent(slug: string): string {
  const file = path.join(process.cwd(), "content", `${slug}.md`);
  return fs.readFileSync(file, "utf8");
}
