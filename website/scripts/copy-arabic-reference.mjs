#!/usr/bin/env node
// Copies the dialect/humanization/taboo reference files that the Slack write
// command needs at runtime from ../arabic (the canonical skill source, one
// level up from this project) into a local directory inside website/.
//
// This exists because Turbopack refuses outputFileTracingIncludes globs that
// navigate outside the project root (../arabic/**), so the files have to
// physically live inside website/ by the time `next build` runs. Runs as a
// pre-dev and pre-build step; arabic/ stays the single source of truth.

import { cpSync, mkdirSync, rmSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const websiteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(websiteRoot, "..", "arabic");
const dest = path.join(websiteRoot, ".arabic-reference");

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

cpSync(path.join(source, "dialects"), path.join(dest, "dialects"), { recursive: true });
mkdirSync(path.join(dest, "references"), { recursive: true });
cpSync(
  path.join(source, "references", "humanization-protocol.md"),
  path.join(dest, "references", "humanization-protocol.md")
);
cpSync(path.join(source, "references", "taboos.md"), path.join(dest, "references", "taboos.md"));

console.log("Copied arabic/ reference files into website/.arabic-reference/");
