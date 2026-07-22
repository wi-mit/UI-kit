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
const PKG = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const PKG_NAME = PKG.name;
const PKG_VERSION = PKG.version;

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

function configPath() {
  return join(process.cwd(), "components.json");
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
  const path = configPath();
  if (!existsSync(path)) {
    console.error(
      `Missing components.json. Run \`npx ${PKG_NAME} init\` in your project first.`,
    );
    process.exit(1);
  }
  const config = readJson(path);
  if (!config.installed || typeof config.installed !== "object") {
    config.installed = {};
  }
  return config;
}

function saveConfig(config) {
  writeJson(configPath(), config);
}

function markInstalled(config, key) {
  config.installed[key] = {
    version: PKG_VERSION,
    updatedAt: new Date().toISOString(),
  };
}

function writeComponentFiles(key, config, registry, mode) {
  const entry = registry.components[key];
  if (!entry) {
    console.error(`Unknown component "${key}". Run: npx ${PKG_NAME} list`);
    process.exit(1);
  }

  const componentsRoot = join(process.cwd(), config.aliases.components);
  const label = mode === "update" ? "Updated" : "Added";

  for (const file of entry.files) {
    const fromAbs = join(ROOT, "src", "components", file);
    const toAbs = join(componentsRoot, file);
    if (!existsSync(fromAbs)) {
      console.error(`Missing source file: ${fromAbs}`);
      process.exit(1);
    }
    copyTransformed(fromAbs, toAbs, config);
    console.log(`✔ ${label} ${relative(process.cwd(), toAbs)}`);
  }

  for (const extra of entry.extraFiles ?? []) {
    const fromAbs = join(ROOT, extra.from);
    const toAbs = join(
      process.cwd(),
      config.aliases.utils,
      extra.to.split("/").pop(),
    );
    copyTransformed(fromAbs, toAbs, config);
    console.log(`✔ ${label} ${relative(process.cwd(), toAbs)}`);
  }

  markInstalled(config, key);
  return entry;
}

function resolveWithDeps(names, registry) {
  const ordered = [];
  const seen = new Set();

  function visit(name) {
    const key = name.toLowerCase();
    if (seen.has(key)) return;
    const entry = registry.components[key];
    if (!entry) {
      console.error(`Unknown component "${name}". Run: npx ${PKG_NAME} list`);
      process.exit(1);
    }
    seen.add(key);
    for (const dep of entry.registryDependencies ?? []) {
      visit(dep);
    }
    ordered.push(key);
  }

  for (const name of names) visit(name);
  return ordered;
}

function cmdInit() {
  const registry = loadRegistry();
  const path = configPath();

  const existing = existsSync(path) ? readJson(path) : {};
  const config = {
    style: registry.style,
    aliases: registry.aliases,
    registry: PKG_NAME,
    installed: existing.installed ?? {},
  };

  writeJson(path, config);

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

  console.log(`\nInitialized ${PKG_NAME}.`);
  console.log("Your installed-component list lives in components.json.");
  console.log("Import tokens once in your app entry:");
  console.log(`  import "./${config.aliases.styles}/tokens.css";`);
  console.log(`\nNext: npx ${PKG_NAME} add button`);
}

function cmdList() {
  const registry = loadRegistry();
  console.log("Available components:\n");
  for (const key of Object.keys(registry.components).sort()) {
    console.log(`  ${key.padEnd(14)} ${registry.components[key].name}`);
  }
}

function cmdStatus() {
  const config = getConfig();
  const keys = Object.keys(config.installed);
  if (!keys.length) {
    console.log("No components installed yet.");
    console.log(`Run: npx ${PKG_NAME} add button`);
    return;
  }

  console.log(`Installed components (tracked in components.json):\n`);
  console.log(`  ${"name".padEnd(14)} ${"version".padEnd(10)} updatedAt`);
  for (const key of keys.sort()) {
    const meta = config.installed[key];
    console.log(
      `  ${key.padEnd(14)} ${String(meta.version ?? "-").padEnd(10)} ${meta.updatedAt ?? "-"}`,
    );
  }
  console.log(`\nLibrary version available via CLI: ${PKG_VERSION}`);
  console.log(`Update one:  npx ${PKG_NAME}@latest update button`);
  console.log(`Update all:  npx ${PKG_NAME}@latest update`);
}

function cmdAdd(names) {
  if (!names.length) {
    console.error(`Usage: npx ${PKG_NAME} add <component> [component...]`);
    process.exit(1);
  }

  const config = getConfig();
  const registry = loadRegistry();
  const keys = resolveWithDeps(names, registry);

  for (const key of keys) {
    const entry = writeComponentFiles(key, config, registry, "add");
    const importPath = `${config.aliases.components}/${entry.name}`;
    console.log(`\nAdded ${entry.name}.`);
    console.log(`  import { ${entry.name} } from "${importPath}";`);
  }

  saveConfig(config);
  console.log(`\nTracked in components.json → installed (${keys.join(", ")})`);
}

function cmdUpdate(names) {
  const config = getConfig();
  const registry = loadRegistry();
  const installedKeys = Object.keys(config.installed);

  let keys;
  if (names.length) {
    keys = resolveWithDeps(names, registry);
  } else {
    if (!installedKeys.length) {
      console.error("No installed components found in components.json.");
      console.error(`Add some first: npx ${PKG_NAME} add button`);
      process.exit(1);
    }
    keys = resolveWithDeps(installedKeys, registry);
  }

  console.log(
    `Updating ${keys.length} component(s) from ${PKG_NAME}@${PKG_VERSION}...\n`,
  );

  for (const key of keys) {
    if (!config.installed[key] && names.length) {
      console.log(`ℹ "${key}" was not installed yet — adding it.`);
    }
    writeComponentFiles(key, config, registry, "update");
  }

  // Keep base utils/tokens in sync when updating
  for (const file of registry.base.files) {
    const fromAbs = join(ROOT, file.from);
    const fileName = file.to.split("/").pop();
    const destination = file.to.startsWith("styles/")
      ? join(process.cwd(), config.aliases.styles, fileName)
      : join(process.cwd(), config.aliases.utils, fileName);
    ensureDir(destination);
    copyFileSync(fromAbs, destination);
    console.log(`✔ Updated ${relative(process.cwd(), destination)}`);
  }

  saveConfig(config);
  console.log(`\nDone. Updated: ${keys.join(", ")}`);
  console.log("Only these component files were overwritten — not a full library install.");
}

function printHelp() {
  console.log(`${PKG_NAME} — copy only the components you use

Usage:
  npx ${PKG_NAME} init
  npx ${PKG_NAME} list
  npx ${PKG_NAME} status
  npx ${PKG_NAME} add <component> [component...]
  npx ${PKG_NAME} update [component...]

Examples:
  npx ${PKG_NAME} add button card dialog
  npx ${PKG_NAME}@latest update button
  npx ${PKG_NAME}@latest update
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
  case "status":
    cmdStatus();
    break;
  case "add":
    cmdAdd(args);
    break;
  case "update":
    cmdUpdate(args);
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
