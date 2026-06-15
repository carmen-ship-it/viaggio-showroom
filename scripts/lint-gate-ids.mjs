#!/usr/bin/env node
/**
 * EB-001 gate ID linter — CI enforcement for CPI-OS Phase A (C-05).
 *
 * Rules (lib/ and app/ only):
 *  1. Fail on legacy gate IDs: G-01 … G-09 (without CPI-G prefix)
 *  2. Fail on deprecated FIE-* / ERE-* operational aliases without CPI-G prefix
 *  3. Fail on CPI-G references with unsupported domain namespaces
 *
 * Supported domains: COIE, CPO, ERE, MKIE, FED, IBS, DNA, FIE, KL
 *
 * Usage: node scripts/lint-gate-ids.mjs [--audit]
 *   --audit  Report legacy IDs in *.md specs (informational; does not fail CI)
 */

import fs from "fs";
import path from "path";

const root = process.cwd();

const SCAN_DIRS = ["lib", "app"];
const CODE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const SPEC_GLOB_DIRS = ["."];

const GATE_DOMAINS = new Set([
  "COIE",
  "CPO",
  "ERE",
  "MKIE",
  "FED",
  "IBS",
  "DNA",
  "FIE",
  "KL",
]);

/** Legacy G-0N — must not appear in application code (EB-001). */
const LEGACY_GATE_RE = /(?<![\w-])G-0([1-9])\b/g;

/** Deprecated operational aliases — must not appear without CPI-G- prefix. */
const DEPRECATED_ALIAS_RE =
  /(?<!CPI-G-)\b(FIE|ERE|COIE|MKIE|CPO|FED|IBS|DNA|KL)-(\d{2})\b/g;

/** Canonical CPI-G references — domain captured in group 1. */
const CANONICAL_GATE_RE = /CPI-G-([A-Z]+)-(\d{2})\b/g;

function walkDir(dir, extensions, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walkDir(full, extensions, files);
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function walkMarkdown(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "demo-review" ||
        entry.name === "executive-visual-audit"
      ) {
        continue;
      }
      walkMarkdown(full, files);
    } else if (entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function lineOf(text, index) {
  return text.slice(0, index).split("\n").length;
}

function collectViolations(filePath, content) {
  const rel = path.relative(root, filePath);
  const violations = [];

  for (const re of [LEGACY_GATE_RE, DEPRECATED_ALIAS_RE]) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(content)) !== null) {
      violations.push({
        file: rel,
        line: lineOf(content, match.index),
        kind: "legacy_gate_id",
        match: match[0],
        message: `Legacy gate ID "${match[0]}" — use CPI-G-{DOMAIN}-{NN} (EB-001)`,
      });
    }
  }

  CANONICAL_GATE_RE.lastIndex = 0;
  let canonical;
  while ((canonical = CANONICAL_GATE_RE.exec(content)) !== null) {
    const domain = canonical[1];
    if (!GATE_DOMAINS.has(domain)) {
      violations.push({
        file: rel,
        line: lineOf(content, canonical.index),
        kind: "invalid_domain",
        match: canonical[0],
        message: `Unsupported gate domain "${domain}" — allowed: ${[...GATE_DOMAINS].join(", ")}`,
      });
    }
  }

  return violations;
}

function lintCodePaths() {
  const files = SCAN_DIRS.flatMap((dir) =>
    walkDir(path.join(root, dir), CODE_EXTENSIONS),
  );
  const violations = files.flatMap((file) =>
    collectViolations(file, fs.readFileSync(file, "utf-8")),
  );
  return { filesScanned: files.length, violations };
}

function auditSpecLegacyIds() {
  const files = walkMarkdown(root).filter((f) => {
    const rel = path.relative(root, f);
    return !rel.startsWith("node_modules");
  });
  const hits = [];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const rel = path.relative(root, file);
    LEGACY_GATE_RE.lastIndex = 0;
    let match;
    while ((match = LEGACY_GATE_RE.exec(content)) !== null) {
      hits.push({ file: rel, line: lineOf(content, match.index), id: match[0] });
    }
  }
  return { filesScanned: files.length, hits };
}

function main() {
  const auditMode = process.argv.includes("--audit");
  const { filesScanned, violations } = lintCodePaths();

  console.log(`lint-gate-ids: scanned ${filesScanned} files in ${SCAN_DIRS.join(", ")}`);

  if (violations.length === 0) {
    console.log("OK — no legacy or invalid gate IDs in application code");
  } else {
    for (const v of violations) {
      console.error(`${v.file}:${v.line}  ${v.message}`);
    }
    console.error(`\nFAIL — ${violations.length} gate ID violation(s)`);
    process.exitCode = 1;
  }

  if (auditMode) {
    const { filesScanned: mdCount, hits } = auditSpecLegacyIds();
    console.log(`\nAudit: ${hits.length} legacy G-0N reference(s) in ${mdCount} markdown files`);
    for (const h of hits.slice(0, 50)) {
      console.log(`  ${h.file}:${h.line}  ${h.id}`);
    }
    if (hits.length > 50) {
      console.log(`  … and ${hits.length - 50} more (see ERRATA-001 scope)`);
    }
  }
}

main();
