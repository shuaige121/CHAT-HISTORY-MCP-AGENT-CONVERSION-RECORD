# Agent Recorder MCP

> Le README en anglais fait foi. Les traductions peuvent prendre du retard.

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP est un serveur MCP léger qui enregistre les sessions Codex CLI en logs structurés, avec un HTML viewer local et un launcher optionnel pour reprendre rapidement.

## Quickstart

Installez le paquet MCP server :

```bash
cd mcp/agent-recorder
npm install
```

Enregistrez et lancez avec Codex CLI (ajustez le chemin) :

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- Enregistre les sessions Codex CLI en JSONL/Markdown
- Sépare les logs par type (chat / system notes / tool logs)
- Nom de fichier avec project, title, session id, timestamp
- HTML viewer statique avec recherche et filtres
- Génère un contexte de reprise
- Configurable via variables d’environnement

## FAQ (Top 3)

**Q1 : Où sont enregistrés les logs ?**
Par défaut dans `~/Desktop/ai agent record`, configurable avec `AI_AGENT_RECORD_DIR`.

**Q2 : Peut-on rendre les noms de fichiers plus lisibles ?**
La première phrase utilisateur sert de title ; ajustez `AI_AGENT_RECORD_TITLE_FROM_USER` et `AI_AGENT_RECORD_TITLE_MAX`.

**Q3 : Comment inclure tool calls / tool outputs ?**
Définissez `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` et/ou `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`.

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
