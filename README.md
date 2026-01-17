# Agent Recorder MCP

> English README is the source of truth. Translations may lag behind.

**Languages:** [English](README.md) | [简体中文](docs/i18n/README.zh-Hans.md) | [繁體中文](docs/i18n/README.zh-Hant.md) | [日本語](docs/i18n/README.ja.md) | [한국어](docs/i18n/README.ko.md) | [Español](docs/i18n/README.es.md) | [Português (Brasil)](docs/i18n/README.pt-BR.md) | [Français](docs/i18n/README.fr.md) | [Deutsch](docs/i18n/README.de.md) | [Русский](docs/i18n/README.ru.md) | [العربية](docs/i18n/README.ar.md) | [हिन्दी](docs/i18n/README.hi.md) | [Bahasa Indonesia](docs/i18n/README.id.md)

A lightweight MCP server that records Codex CLI sessions to structured logs, plus a local HTML viewer and an optional launcher to resume chats quickly.

## Quickstart

Install the MCP server package:

```bash
cd mcp/agent-recorder
npm install
```

Register and run with Codex CLI (adjust the path):

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

Optional: open `viewer/viewer.html` and pick your record folder to browse and resume conversations.

## Installation

- Requirements: Node.js 18+, Codex CLI (or compatible MCP host).
- MCP server lives in `mcp/agent-recorder/`.
- Viewer lives in `viewer/viewer.html` (static; open in any modern browser).
- Optional launcher: `scripts/agent-bridge` with the systemd unit in `systemd/agent-bridge.service`.

## Usage

- Logs are written to `~/Desktop/ai agent record` by default.
- Files are organized by date (YYYY/MM/DD) and named with project, title, session id, and timestamp.
- Enable split logs to separate chat, system notes, and tool logs (see Configuration).

## Configuration

Set environment variables for the MCP server process:

- `CODEX_SESSIONS_DIR`: override Codex session root (default: `~/.codex/sessions`).
- `AI_AGENT_RECORD_DIR`: output directory (default: `~/Desktop/ai agent record`).
- `AI_AGENT_RECORD_FORMAT`: `jsonl` or `md` (default: `jsonl`).
- `AI_AGENT_RECORD_SCAN_MS`: scan interval in ms (default: `1500`).
- `AI_AGENT_RECORD_BACKFILL_MS`: max age for backfill scans in ms (default: `120000`).
- `AI_AGENT_RECORD_ROLES`: roles recorded in chat log (default: `user,assistant`).
- `AI_AGENT_RECORD_SYSTEM_ROLES`: roles in system notes (default: `system,developer`).
- `AI_AGENT_RECORD_INCLUDE_SYSTEM`: include system notes (`true`/`false`).
- `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS`: include tool calls (`true`/`false`).
- `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS`: include tool outputs (`true`/`false`).
- `AI_AGENT_RECORD_INCLUDE_EVENTS`: include events (`true`/`false`).
- `AI_AGENT_RECORD_MAX_CHARS`: truncate message text (0 = no limit).
- `AI_AGENT_RECORD_MAX_TOOL_CHARS`: truncate tool payloads (0 = no limit).
- `AI_AGENT_RECORD_SPLIT`: write separate files per kind (`true`/`false`).
- `AI_AGENT_RECORD_TITLE_FROM_USER`: derive filename title from first user message (`true`/`false`).
- `AI_AGENT_RECORD_TITLE_MAX`: max title length (default: `60`).

## Troubleshooting

- No output files: confirm `AI_AGENT_RECORD_DIR` is writable and the MCP is registered with `codex mcp list`.
- Viewer can’t open a folder: use a Chromium-based browser that supports the File System Access API.
- Tool logs missing: set `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` and/or `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`.

## Contributing

PRs are welcome. If you change `README.md`, update the translation stubs and refresh `docs/i18n/.readme_base_hash` (CI will warn if you forget).

## License

MIT License. See `LICENSE`.
