# Agent Recorder MCP

> Das englische README ist die maßgebliche Quelle. Übersetzungen können hinterherhinken.

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP ist ein leichtgewichtiger MCP-Server, der Codex CLI-Sitzungen als strukturierte Logs aufzeichnet, mit lokalem HTML viewer und optionalem launcher zum schnellen Fortsetzen.

## Quickstart

MCP server Paket installieren:

```bash
cd mcp/agent-recorder
npm install
```

Mit Codex CLI registrieren und starten (Pfad anpassen):

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- Zeichnet Codex CLI-Sitzungen in JSONL/Markdown auf
- Trennt Logs nach Typ (chat / system notes / tool logs)
- Dateiname enthält project, title, session id, timestamp
- Statischer HTML viewer mit Suche und Filtern
- Erstellt Kontext zum Fortsetzen
- Über Umgebungsvariablen konfigurierbar

## FAQ (Top 3)

**Q1: Wo werden die Logs gespeichert?**
Standardmäßig in `~/Desktop/ai agent record`, anpassbar mit `AI_AGENT_RECORD_DIR`.

**Q2: Kann man lesbare Dateinamen bekommen?**
Die erste Nutzer-Nachricht wird als title verwendet; justiere `AI_AGENT_RECORD_TITLE_FROM_USER` und `AI_AGENT_RECORD_TITLE_MAX`.

**Q3: Wie tool calls / tool outputs einbinden?**
Setze `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` und/oder `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`.

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
