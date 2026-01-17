# Agent Recorder MCP

> El README en inglés es la fuente de verdad. Las traducciones pueden retrasarse.

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP es un servidor MCP ligero que registra sesiones de Codex CLI en logs estructurados, con un HTML viewer local y un launcher opcional para retomar conversaciones.

## Quickstart

Instala el paquete del MCP server:

```bash
cd mcp/agent-recorder
npm install
```

Registra y ejecuta con Codex CLI (ajusta la ruta):

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- Registra sesiones de Codex CLI en JSONL/Markdown
- Divide logs por tipo (chat / system notes / tool logs)
- Nombre de archivo con project, title, session id, timestamp
- HTML viewer estático con búsqueda y filtros
- Genera contexto para continuar
- Configurable mediante variables de entorno

## FAQ (Top 3)

**Q1: ¿Dónde se guardan los logs?**
Por defecto en `~/Desktop/ai agent record`, configurable con `AI_AGENT_RECORD_DIR`.

**Q2: ¿Se pueden usar nombres de archivo más legibles?**
Se usa la primera frase del usuario como title; ajusta `AI_AGENT_RECORD_TITLE_FROM_USER` y `AI_AGENT_RECORD_TITLE_MAX`.

**Q3: ¿Cómo incluir tool calls / tool outputs?**
Activa `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` y/o `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`.

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
