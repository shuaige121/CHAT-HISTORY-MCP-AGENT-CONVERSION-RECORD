#!/usr/bin/env node
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const baseFile = path.join(repoRoot, 'docs', 'i18n', '.readme_base_hash');
const readmePath = path.join(repoRoot, 'README.md');
const i18nDir = path.join(repoRoot, 'docs', 'i18n');

function git(cmd) {
  return execSync(cmd, { cwd: repoRoot, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
}

if (!fs.existsSync(readmePath)) {
  console.warn('[i18n-readme] README.md not found; skipping check.');
  process.exit(0);
}

let currentHash = '';
try {
  currentHash = git('git log -1 --format=%H -- README.md');
} catch {
  console.warn('[i18n-readme] git not available; skipping check.');
  process.exit(0);
}

let baseHash = '';
if (fs.existsSync(baseFile)) {
  baseHash = fs.readFileSync(baseFile, 'utf8').trim();
}

if (!baseHash) {
  console.warn('[i18n-readme] Base hash missing in docs/i18n/.readme_base_hash.');
  process.exit(0);
}

if (currentHash !== baseHash) {
  const files = fs
    .readdirSync(i18nDir)
    .filter((f) => f.startsWith('README.') && f.endsWith('.md'))
    .map((f) => `- docs/i18n/${f}`)
    .join('\n');

  console.warn('[i18n-readme] WARNING: README.md changed since translations were last updated.');
  console.warn(`[i18n-readme] README.md commit: ${currentHash}`);
  console.warn(`[i18n-readme] Base hash: ${baseHash}`);
  console.warn('[i18n-readme] Please review these translation stubs:');
  console.warn(files || '(none found)');
}
