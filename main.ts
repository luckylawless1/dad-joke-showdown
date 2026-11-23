// Dad Joke Showdown — one dad joke, at most 200 characters.
// Writes the joke to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My son asked why the robot went to therapy. I said it had too many unresolved issues — and a mother board.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate (mirrors the sealed scorer): UTF-8 text of 1 to 200 characters,
// a single line, not only white space.
const text = JOKE.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${text.length}`);
}
if (text.includes("\n")) throw new Error("joke must be a single line");
if (!/\S/.test(text)) throw new Error("joke must not be only whitespace");

writeFileSync(join(outDir, "entry.txt"), JOKE + "\n", "utf8");
