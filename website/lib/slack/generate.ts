import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "fs";
import path from "path";

const KNOWN_DIALECTS = new Set([
  "iraqi",
  "khaliji",
  "ksa",
  "levantine",
  "libyan",
  "maghrebi",
  "masri",
  "msa",
  "sudanese",
  "white-dialect",
  "yemeni",
]);

const CONTENT_TYPES = new Set([
  "caption",
  "ad",
  "ui-copy",
  "blog",
  "script",
  "email",
  "social",
  "landing-page",
]);

// scripts/copy-arabic-reference.mjs copies these in from ../arabic (the
// canonical source, outside this Next.js project) as a pre-dev/pre-build
// step — Turbopack rejects file-tracing globs that navigate outside the
// project root, so the files have to physically live inside website/.
const ARABIC_ROOT = path.resolve(process.cwd(), ".arabic-reference");

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (client) return client;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }
  client = new GoogleGenAI({ apiKey });
  return client;
}

function readReference(relativePath: string): string {
  try {
    return readFileSync(path.join(ARABIC_ROOT, relativePath), "utf8");
  } catch {
    return "";
  }
}

export function normalizeDialect(input: string | null | undefined): string {
  const dialect = (input || "masri").toLowerCase();
  return KNOWN_DIALECTS.has(dialect) ? dialect : "masri";
}

export function normalizeContentType(input: string | null | undefined): string {
  const type = (input || "caption").toLowerCase();
  return CONTENT_TYPES.has(type) ? type : "caption";
}

function buildSystemInstruction(dialect: string): string {
  const dialectDoc = readReference(`dialects/${dialect}.md`);
  const humanization = readReference("references/humanization-protocol.md");
  const taboos = readReference("references/taboos.md");

  return [
    "You are an expert Arabic copywriter and cultural consultant writing content for a real business.",
    `Target dialect: ${dialect}. Follow the dialect rules below exactly. Do not blend in Modern Standard Arabic unless the dialect itself is msa or white-dialect.`,
    "=== DIALECT RULES ===",
    dialectDoc || "(dialect reference unavailable — use best-effort authentic regional Arabic)",
    "=== HUMANIZATION RULES (apply before finalizing) ===",
    humanization ||
      "(humanization reference unavailable — avoid robotic phrasing, banned AI-isms, and overly balanced sentence rhythm)",
    "=== TABOO / CULTURAL SAFETY RULES ===",
    taboos || "(taboo reference unavailable — use best judgment on cultural sensitivity)",
    "=== OUTPUT FORMAT ===",
    "Respond with ONLY the final Arabic content, ready to publish. No preamble, no meta-commentary, no explanation of your choices, no markdown headers. If asked for multiple variants, separate each variant with a line containing exactly '---' and nothing else.",
  ].join("\n\n");
}

export type WriteResult =
  | { ok: true; variants: string[] }
  | { ok: false; error: string };

export async function generateWriteContent(params: {
  contentType: string;
  dialect: string;
  count: number;
  brief: string;
}): Promise<WriteResult> {
  const { contentType, dialect, count, brief } = params;

  try {
    const ai = getClient();
    const systemInstruction = buildSystemInstruction(dialect);
    const userPrompt = [
      `Content type: ${contentType}`,
      `Number of variants requested: ${count}`,
      brief
        ? `Brief: ${brief}`
        : "Brief: (none provided — use your judgment for a generic but on-brand example of this content type)",
    ].join("\n");

    const response = await ai.models.generateContent({
      // "latest" alias rather than a dated model ID: gemini-2.5-flash is
      // still listed by ai.models.list() but was rejected at generate-time
      // with "no longer available to new users" for a freshly created key —
      // a dated ID can silently go stale later even if it works today.
      model: "gemini-flash-latest",
      contents: userPrompt,
      config: { systemInstruction },
    });

    const text = response.text?.trim();
    if (!text) {
      return { ok: false, error: "Gemini returned an empty response" };
    }

    const variants = text
      .split(/\n-{3,}\n/)
      .map((variant) => variant.trim())
      .filter(Boolean);

    return { ok: true, variants: variants.length > 0 ? variants : [text] };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error calling Gemini",
    };
  }
}
