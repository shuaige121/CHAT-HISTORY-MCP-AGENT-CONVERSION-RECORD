# Agent Recorder MCP

> README bahasa Inggris adalah sumber utama. Terjemahan bisa tertinggal.

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP adalah server MCP ringan untuk merekam sesi Codex CLI ke log terstruktur, dengan HTML viewer lokal dan launcher opsional untuk melanjutkan percakapan.

## Quickstart

Instal paket MCP server:

```bash
cd mcp/agent-recorder
npm install
```

Daftarkan dan jalankan dengan Codex CLI (sesuaikan path):

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- Merekam sesi Codex CLI ke JSONL/Markdown
- Memisahkan log berdasarkan jenis (chat / system notes / tool logs)
- Nama file berisi project, title, session id, timestamp
- HTML viewer statis dengan pencarian dan filter
- Membuat konteks untuk melanjutkan
- Konfigurasi fleksibel lewat environment variable

## FAQ (Top 3)

**Q1: Di mana log disimpan?**
Default di `~/Desktop/ai agent record`, bisa diubah via `AI_AGENT_RECORD_DIR`.

**Q2: Bisa membuat nama file lebih mudah dibaca?**
Menggunakan pesan user pertama sebagai title; atur `AI_AGENT_RECORD_TITLE_FROM_USER` dan `AI_AGENT_RECORD_TITLE_MAX`.

**Q3: Bagaimana menyertakan tool calls / tool outputs?**
Set `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` dan/atau `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`.

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
