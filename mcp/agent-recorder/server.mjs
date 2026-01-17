#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ListPromptsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const HOME = os.homedir();
const SESSIONS_ROOT = process.env.CODEX_SESSIONS_DIR || path.join(HOME, ".codex", "sessions");
const OUTPUT_ROOT = process.env.AI_AGENT_RECORD_DIR || path.join(HOME, "Desktop", "ai agent record");
const FORMAT = (process.env.AI_AGENT_RECORD_FORMAT || "jsonl").toLowerCase();
const SCAN_INTERVAL_MS = Number(process.env.AI_AGENT_RECORD_SCAN_MS || "1500");
const BACKFILL_MAX_AGE_MS = Number(process.env.AI_AGENT_RECORD_BACKFILL_MS || "120000");
const ROLE_FILTER = (process.env.AI_AGENT_RECORD_ROLES || "user,assistant")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
const ROLE_SET = new Set(ROLE_FILTER);
const MAX_CHARS = Number(process.env.AI_AGENT_RECORD_MAX_CHARS || "0");
const SPLIT = (process.env.AI_AGENT_RECORD_SPLIT || "false").toLowerCase() === "true";
const SYSTEM_ROLE_FILTER = (process.env.AI_AGENT_RECORD_SYSTEM_ROLES || "system,developer")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
const SYSTEM_ROLE_SET = new Set(SYSTEM_ROLE_FILTER);
const INCLUDE_SYSTEM = (process.env.AI_AGENT_RECORD_INCLUDE_SYSTEM || "false").toLowerCase() === "true";
const INCLUDE_TOOL_CALLS = (process.env.AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS || "false").toLowerCase() === "true";
const INCLUDE_TOOL_OUTPUTS = (process.env.AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS || "false").toLowerCase() === "true";
const INCLUDE_EVENTS = (process.env.AI_AGENT_RECORD_INCLUDE_EVENTS || "false").toLowerCase() === "true";
const MAX_TOOL_CHARS = Number(process.env.AI_AGENT_RECORD_MAX_TOOL_CHARS || "0");
const TITLE_FROM_USER = (process.env.AI_AGENT_RECORD_TITLE_FROM_USER || "true").toLowerCase() === "true";
const TITLE_MAX = Number(process.env.AI_AGENT_RECORD_TITLE_MAX || "60");

const fileStates = new Map();

function sanitizeName(name) {
  const cleaned = name.replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^_+|_+$/g, "");
  return cleaned || "unknown";
}

function deriveTitle(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return "";
  let cut = trimmed;
  const newlineIdx = cut.indexOf("\n");
  if (newlineIdx >= 0) {
    cut = cut.slice(0, newlineIdx);
  }
  const punctIdx = cut.search(/[。！？!?]/);
  if (punctIdx >= 0) {
    cut = cut.slice(0, punctIdx + 1);
  }
  cut = cut.trim();
  return cut;
}

function uniquePath(targetPath) {
  if (!fs.existsSync(targetPath)) return targetPath;
  const dir = path.dirname(targetPath);
  const ext = path.extname(targetPath);
  const base = path.basename(targetPath, ext);
  for (let i = 2; i <= 50; i++) {
    const candidate = path.join(dir, `${base}__v${i}${ext}`);
    if (!fs.existsSync(candidate)) return candidate;
  }
  return targetPath;
}

function listJsonlFiles(dir) {
  let results = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(listJsonlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".jsonl")) {
      results.push(full);
    }
  }
  return results;
}

function parseFilenameMeta(filePath) {
  const base = path.basename(filePath);
  const match = base.match(/^rollout-(\d{4}-\d{2}-\d{2})T(\d{2})-(\d{2})-(\d{2})-(.+)\.jsonl$/);
  if (!match) return null;
  const [_, date, hh, mm, ss, sessionId] = match;
  const ts = `${date}T${hh}:${mm}:${ss}`;
  return { sessionId, startedAt: ts };
}

function buildOutPath(state, kind) {
  const key = SPLIT ? (kind || "all") : "all";
  const startedAt = state.startedAt || new Date().toISOString();
  const d = new Date(startedAt);
  const yyyy = String(d.getFullYear()).padStart(4, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");

  const projectName = sanitizeName(state.project || "unknown");
  const sessionId = sanitizeName(state.sessionId || "unknown");
  let titleSlug = state.titleSlug || sanitizeName(state.title || "untitled");
  if (TITLE_MAX > 0) titleSlug = titleSlug.slice(0, TITLE_MAX);
  if (!titleSlug) titleSlug = "untitled";

  const dir = path.join(OUTPUT_ROOT, yyyy, mm, dd);
  fs.mkdirSync(dir, { recursive: true });

  const ext = FORMAT === "md" ? "md" : "jsonl";
  const suffix = SPLIT && key !== "all" ? `__${key}` : "";
  const filename = `${projectName}__${titleSlug}__${sessionId}__${yyyy}${mm}${dd}-${hh}${mi}${ss}${suffix}.${ext}`;
  return path.join(dir, filename);
}

function getOutPath(state, kind) {
  const key = SPLIT ? (kind || "all") : "all";
  if (!state.outPaths) state.outPaths = new Map();
  const existing = state.outPaths.get(key);
  if (existing) return existing;

  const outPath = buildOutPath(state, kind);
  const startedAt = state.startedAt || new Date().toISOString();

  if (!fs.existsSync(outPath)) {
    if (FORMAT === "md") {
      const header = `# Codex Session Record\n\n- started_at: ${startedAt}\n- session_id: ${state.sessionId || "unknown"}\n- project: ${state.project || "unknown"}\n- cwd: ${state.cwd || "unknown"}\n- kind: ${key}\n\n---\n`;
      fs.writeFileSync(outPath, header);
    } else {
      const meta = {
        type: "session_meta",
        started_at: startedAt,
        session_id: state.sessionId || "unknown",
        project: state.project || "unknown",
        cwd: state.cwd || "unknown",
        kind: key
      };
      fs.writeFileSync(outPath, JSON.stringify(meta) + "\n");
    }
  }

  state.outPaths.set(key, outPath);
  return outPath;
}

function renameOutPaths(state) {
  if (!state.outPaths || state.outPaths.size === 0) return;
  for (const [key, oldPath] of state.outPaths.entries()) {
    const newPath = buildOutPath(state, key);
    if (newPath === oldPath) continue;
    const finalPath = uniquePath(newPath);
    try {
      fs.renameSync(oldPath, finalPath);
      state.outPaths.set(key, finalPath);
    } catch {
      // If rename fails, keep the old path.
    }
  }
}

function applyTitle(state, title) {
  const raw = String(title || "").trim();
  if (!raw) return;
  let slug = sanitizeName(raw);
  if (TITLE_MAX > 0) slug = slug.slice(0, TITLE_MAX);
  if (!slug) return;
  if (state.titleSlug === slug) return;
  state.title = raw;
  state.titleSlug = slug;
  renameOutPaths(state);
}

function extractText(content) {
  if (!Array.isArray(content)) return "";
  const parts = [];
  for (const item of content) {
    if (item && typeof item.text === "string") {
      parts.push(item.text);
    }
  }
  return parts.join("\n").trim();
}

function writeRecord(state, kind, ts, role, text) {
  if (!text) return;
  const outPath = getOutPath(state, kind);
  if (!outPath) return;

  if (FORMAT === "md") {
    const line = `\n## ${ts} ${role}\n\n${text}\n`;
    fs.appendFileSync(outPath, line);
  } else {
    const record = { ts, role, text };
    fs.appendFileSync(outPath, JSON.stringify(record) + "\n");
  }
}

function writeRecordObject(state, kind, record) {
  const outPath = getOutPath(state, kind);
  if (!outPath) return;
  if (FORMAT === "md") {
    const title = record.type ? record.type.toUpperCase() : "EVENT";
    const header = `\n## ${record.ts || new Date().toISOString()} ${title}\n\n`;
    const body = JSON.stringify(record, null, 2);
    fs.appendFileSync(outPath, header + "```json\n" + body + "\n```\n");
  } else {
    fs.appendFileSync(outPath, JSON.stringify(record) + "\n");
  }
}

function processLine(state, line) {
  let obj;
  try {
    obj = JSON.parse(line);
  } catch {
    return;
  }
  if (!obj || typeof obj !== "object") return;

  if (obj.type === "session_meta" && obj.payload) {
    state.sessionId = obj.payload.id || state.sessionId;
    state.startedAt = obj.payload.timestamp || state.startedAt;
    state.cwd = obj.payload.cwd || state.cwd;
    state.project = state.cwd ? path.basename(state.cwd) : state.project;
    return;
  }

  if (obj.type === "response_item" && obj.payload && obj.payload.type === "message") {
    const roleRaw = String(obj.payload.role || "").toLowerCase();
    const fullText = extractText(obj.payload.content);
    let text = fullText;
    if (MAX_CHARS > 0 && text.length > MAX_CHARS) {
      text = `${text.slice(0, MAX_CHARS)} ...[truncated]`;
    }
    const ts = obj.timestamp || new Date().toISOString();
    if (SYSTEM_ROLE_SET.has(roleRaw)) {
      if (!INCLUDE_SYSTEM) return;
      writeRecord(state, "system-notes", ts, roleRaw, text);
      return;
    }
    if (!ROLE_SET.has(roleRaw)) return;
    if (TITLE_FROM_USER && roleRaw === "user" && !state.titleSlug) {
      const title = deriveTitle(fullText);
      if (title) applyTitle(state, title);
    }
    writeRecord(state, "chat", ts, roleRaw, text);
    return;
  }

  if (obj.type === "response_item" && obj.payload && obj.payload.type === "function_call") {
    if (!INCLUDE_TOOL_CALLS) return;
    const ts = obj.timestamp || new Date().toISOString();
    const name = obj.payload.name || "unknown";
    const callId = obj.payload.call_id || "unknown";
    let args = String(obj.payload.arguments || "");
    if (MAX_TOOL_CHARS > 0 && args.length > MAX_TOOL_CHARS) {
      args = `${args.slice(0, MAX_TOOL_CHARS)} ...[truncated]`;
    }
    if (state.toolCalls) {
      state.toolCalls.set(callId, name);
    }
    writeRecordObject(state, "tool-log", { ts, type: "tool_call", name, call_id: callId, arguments: args });
    return;
  }

  if (obj.type === "response_item" && obj.payload && obj.payload.type === "function_call_output") {
    if (!INCLUDE_TOOL_OUTPUTS) return;
    const ts = obj.timestamp || new Date().toISOString();
    const callId = obj.payload.call_id || "unknown";
    const name = state.toolCalls && state.toolCalls.get(callId) ? state.toolCalls.get(callId) : "unknown";
    let output = String(obj.payload.output || "");
    if (MAX_TOOL_CHARS > 0 && output.length > MAX_TOOL_CHARS) {
      output = `${output.slice(0, MAX_TOOL_CHARS)} ...[truncated]`;
    }
    writeRecordObject(state, "tool-log", { ts, type: "tool_output", name, call_id: callId, output });
    return;
  }

  if (INCLUDE_EVENTS && obj.type === "event_msg" && obj.payload) {
    const ts = obj.timestamp || new Date().toISOString();
    const eventType = obj.payload.type || "event";
    const text = obj.payload.text || "";
    writeRecordObject(state, "event-log", { ts, type: "event", event_type: eventType, text });
    return;
  }

  if (INCLUDE_EVENTS && obj.type === "response_item" && obj.payload && obj.payload.type === "reasoning") {
    const ts = obj.timestamp || new Date().toISOString();
    const summary = obj.payload.summary || [];
    const summaryText = summary.map((s) => s.summary_text || "").join("\n").trim();
    if (summaryText) {
      writeRecordObject(state, "event-log", { ts, type: "reasoning_summary", text: summaryText });
    }
    return;
  }
}

function processFile(filePath) {
  let state = fileStates.get(filePath);
  if (!state) {
    const meta = parseFilenameMeta(filePath) || {};
    state = {
      offset: 0,
      remainder: "",
      lastSize: 0,
      isNew: true,
      toolCalls: new Map(),
      outPaths: new Map(),
      sessionId: meta.sessionId,
      startedAt: meta.startedAt,
      cwd: undefined,
      project: undefined,
      title: undefined,
      titleSlug: undefined
    };
    fileStates.set(filePath, state);
  }

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch {
    return;
  }

  if (state.isNew && stat.size > 0) {
    const ageMs = Date.now() - stat.mtimeMs;
    if (ageMs > BACKFILL_MAX_AGE_MS) {
      state.offset = stat.size;
      state.lastSize = stat.size;
      state.isNew = false;
      return;
    }
  }

  state.isNew = false;

  if (stat.size <= state.offset) {
    state.lastSize = stat.size;
    return;
  }

  const length = stat.size - state.offset;
  const fd = fs.openSync(filePath, "r");
  const buf = Buffer.alloc(length);
  fs.readSync(fd, buf, 0, length, state.offset);
  fs.closeSync(fd);

  state.offset = stat.size;
  state.lastSize = stat.size;

  const chunk = state.remainder + buf.toString("utf8");
  const lines = chunk.split(/\n/);
  state.remainder = lines.pop() || "";

  for (const line of lines) {
    if (!line.trim()) continue;
    processLine(state, line);
  }
}

function scan() {
  const files = listJsonlFiles(SESSIONS_ROOT);
  for (const file of files) {
    processFile(file);
  }
}

async function main() {
  const server = new McpServer({
    name: "codex-agent-recorder",
    version: "0.1.0"
  });

  // Ensure list handlers exist even when no tools/resources/prompts are registered.
  server.server.registerCapabilities({ tools: { listChanged: false } });
  server.server.setRequestHandler(ListToolsRequestSchema, () => ({ tools: [] }));
  server.server.setRequestHandler(ListResourcesRequestSchema, () => ({ resources: [] }));
  server.server.setRequestHandler(ListPromptsRequestSchema, () => ({ prompts: [] }));

  const transport = new StdioServerTransport();
  await server.connect(transport);

  scan();
  setInterval(scan, SCAN_INTERVAL_MS);
}

main().catch((error) => {
  console.error("Recorder MCP server error:", error);
  process.exit(1);
});
