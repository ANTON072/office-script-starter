import { execSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, watch, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

const isWatch = process.argv.includes("--watch");
const scriptsDir = resolve("src/scripts");

/** import を再帰解決してモジュール一覧を依存順で返す */
function collectModules(filePath, visited = new Set()) {
  if (visited.has(filePath)) return [];
  visited.add(filePath);

  const content = readFileSync(filePath, "utf8");
  const dir = dirname(filePath);
  const modules = [];

  const importRe = /^import\s+.*?\s+from\s+["'](\.[^"']+)["'];?\s*$/gm;
  for (const match of content.matchAll(importRe)) {
    const importPath = match[1].endsWith(".ts") ? match[1] : match[1] + ".ts";
    modules.push(...collectModules(resolve(dir, importPath), visited));
  }

  modules.push({ path: filePath, content });
  return modules;
}

/** import文・export修飾子を除去して TypeScript ソースを返す */
function stripModuleSyntax(content) {
  return content
    .replace(/^import\s+.*?\s+from\s+["'].*?["'];?\s*\n/gm, "")
    .replace(/^export\s+(function|class|const|let|var|type|interface|enum)\s+/gm, "$1 ")
    .replace(/^export\s+\{[^}]*\};\s*\n?/gm, "")
    .replace(/^export\s+default\s+/gm, "")
    .trim();
}

function buildScript(entryPath) {
  const modules = collectModules(entryPath);
  const cwd = process.cwd();

  const output =
    modules
      .map(({ path, content }) => {
        const label = `// ${path.replace(cwd + "/", "")}`;
        return `${label}\n${stripModuleSyntax(content)}`;
      })
      .join("\n\n") + "\n";

  const name = basename(entryPath, ".ts");
  mkdirSync("dist", { recursive: true });
  writeFileSync(`dist/${name}.ts`, output);
  return { name, output };
}

function build() {
  const entries = readdirSync(scriptsDir)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => resolve(scriptsDir, f));

  if (entries.length === 0) {
    console.warn("No .ts files found in src/scripts/");
    return;
  }

  const results = entries.map(buildScript);
  const time = new Date().toLocaleTimeString();

  if (results.length === 1) {
    execSync("pbcopy", { input: results[0].output });
    console.log(`[${time}] dist/${results[0].name}.ts updated (copied to clipboard)`);
  } else {
    for (const { name } of results) {
      console.log(`[${time}] dist/${name}.ts updated`);
    }
  }
}

build();

if (isWatch) {
  console.log("watching...");
  watch("src", { recursive: true }, (_event, filename) => {
    if (filename?.endsWith(".ts")) build();
  });
}
