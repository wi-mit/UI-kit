#!/usr/bin/env node
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const REGISTRY_PATH = join(ROOT, "registry", "registry.json");

function loadRegistry() {
  return JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
}

function ensureDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, data) {
  ensureDir(path);
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function toImportPath(fromFile, toFileWithoutExt) {
  return relative(dirname(fromFile), toFileWithoutExt)
    .replaceAll("\\", "/")
    .replace(/^(?!\.)/, "./");
}

function transformSource(content, targetFile, config) {
  const utilsFile = resolve(process.cwd(), config.aliases.utils, "utils");
  const hookFile = resolve(
    process.cwd(),
    config.aliases.utils,
    "useControllableOpen",
  );

  return content
    .replaceAll("@/utils/cx", toImportPath(targetFile, utilsFile))
    .replaceAll('from "@/utils"', `from "${toImportPath(targetFile, utilsFile)}"`)
    .replaceAll(
      "@/hooks/useControllableOpen",
      toImportPath(targetFile, hookFile),
    );
}

function copyTransformed(fromAbs, toAbs, config) {
  ensureDir(toAbs);
  const raw = readFileSync(fromAbs, "utf8");
  const next =
    toAbs.endsWith(".ts") || toAbs.endsWith(".tsx")
      ? transformSource(raw, toAbs, config)
      : raw;
  writeFileSync(toAbs, next, "utf8");
}

function getConfig() {
  const configPath = join(process.cwd(), "components.json");
  if (!existsSync(configPath)) {
    console.error(
      "Missing components.json. Run `npx @uae-wi/ui init` in your project first.",
    );
    process.exit(1);
  }
  return readJson(configPath);
}

function cmdInit() {
  const registry = loadRegistry();
  const configPath = join(process.cwd(), "components.json");

  const config = {
    style: registry.style,
    aliases: registry.aliases,
    registry: "@uae-wi/ui",
  };

  writeJson(configPath, config);

  for (const file of registry.base.files) {
    const fromAbs = join(ROOT, file.from);
    const fileName = file.to.split("/").pop();
    const destination = file.to.startsWith("styles/")
      ? join(process.cwd(), config.aliases.styles, fileName)
      : join(process.cwd(), config.aliases.utils, fileName);

    ensureDir(destination);
    copyFileSync(fromAbs, destination);
    console.log(`✔ Added ${relative(process.cwd(), destination)}`);
  }

  console.log("\nInitialized @uae-wi/ui.");
  console.log("Import tokens once in your app entry:");
  console.log(`  import "./${config.aliases.styles}/tokens.css";`);
  console.log("\nNext: npx @uae-wi/ui add button");
}

function cmdList() {
  const registry = loadRegistry();
  console.log("Available components:\n");
  for (const key of Object.keys(registry.components).sort()) {
    console.log(`  ${key.padEnd(12)} ${registry.components[key].name}`);
  }
}

function addComponent(name, config, registry) {
  const key = name.toLowerCase();
  const entry = registry.components[key];
  if (!entry) {
    console.error(`Unknown component "${name}". Run: npx @uae-wi/ui list`);
    process.exit(1);
  }

  const componentsRoot = join(process.cwd(), config.aliases.components);

  for (const file of entry.files) {
    const fromAbs = join(ROOT, "src", "components", file);
    const toAbs = join(componentsRoot, file);
    if (!existsSync(fromAbs)) {
      console.error(`Missing source file: ${fromAbs}`);
      process.exit(1);
    }
    copyTransformed(fromAbs, toAbs, config);
    console.log(`✔ Added ${relative(process.cwd(), toAbs)}`);
  }

  for (const extra of entry.extraFiles ?? []) {
    const fromAbs = join(ROOT, extra.from);
    const toAbs = join(
      process.cwd(),
      config.aliases.utils,
      extra.to.split("/").pop(),
    );
    copyTransformed(fromAbs, toAbs, config);
    console.log(`✔ Added ${relative(process.cwd(), toAbs)}`);
  }

  const importPath = `${config.aliases.components}/${entry.name}`;
  console.log(`\nAdded ${entry.name}.`);
  console.log(`  import { ${entry.name} } from "${importPath}";`);
}

function cmdAdd(names) {
  if (!names.length) {
    console.error("Usage: npx @uae-wi/ui add <component> [component...]");
    process.exit(1);
  }
  const config = getConfig();
  const registry = loadRegistry();
  for (const name of names) {
    addComponent(name, config, registry);
  }
}

function printHelp() {
  console.log(`@uae-wi/ui — shadcn-style component CLI

Usage:
  npx @uae-wi/ui init
  npx @uae-wi/ui list
  npx @uae-wi/ui add <component> [component...]

Examples:
  npx @uae-wi/ui add button
  npx @uae-wi/ui add alert badge dialog
`);
}

const [, , command, ...args] = process.argv;

switch (command) {
  case "init":
    cmdInit();
    break;
  case "list":
    cmdList();
    break;
  case "add":
    cmdAdd(args);
    break;
  case "help":
  case "--help":
  case "-h":
  case undefined:
    printHelp();
    break;
  default:
    console.error(`Unknown command "${command}"`);
    printHelp();
    process.exit(1);
}
