// Server-only: reads an article's Markdown at build time and turns it into HTML.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const dir = path.join(process.cwd(), "content", "blog");

function read(slug: string) {
  return fs.readFileSync(path.join(dir, `${slug}.md`), "utf8");
}

export function getPostHtml(slug: string): string {
  return marked.parse(read(slug), { async: false }) as string;
}

/** Minutes to read at roughly 220 words a minute */
export function readingMinutes(slug: string): number {
  const words = read(slug).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
