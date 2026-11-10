import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const source = new URL("../../src/data/gear.js", import.meta.url);
const destination = new URL("../lib/generatedGear.js", import.meta.url);

copyFileSync(source, destination);
console.log(`Synced gear catalog from ${fileURLToPath(source)}`);
