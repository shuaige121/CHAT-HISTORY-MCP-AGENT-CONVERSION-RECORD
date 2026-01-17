# Agent Recorder MCP

> O README em inglês é a fonte de verdade. As traduções podem ficar desatualizadas.

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP é um servidor MCP leve que registra sessões do Codex CLI em logs estruturados, com um HTML viewer local e um launcher opcional para retomar conversas.

## Quickstart

Instale o pacote do MCP server:

```bash
cd mcp/agent-recorder
npm install
```

Registre e execute com o Codex CLI (ajuste o caminho):

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- Registra sessões do Codex CLI em JSONL/Markdown
- Separa logs por tipo (chat / system notes / tool logs)
- Nome do arquivo com project, title, session id, timestamp
- HTML viewer estático com busca e filtros
- Gera contexto para continuar
- Configurável via variáveis de ambiente

## FAQ (Top 3)

**Q1: Onde os logs são salvos?**
Por padrão em `~/Desktop/ai agent record`, configurável com `AI_AGENT_RECORD_DIR`.

**Q2: Dá para deixar o nome dos arquivos mais legível?**
Usa a primeira mensagem do usuário como title; ajuste `AI_AGENT_RECORD_TITLE_FROM_USER` e `AI_AGENT_RECORD_TITLE_MAX`.

**Q3: Como incluir tool calls / tool outputs?**
Defina `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` e/ou `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`.

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
