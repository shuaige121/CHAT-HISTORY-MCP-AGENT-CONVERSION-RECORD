# Agent Recorder MCP

> Английский README — источник истины. Переводы могут отставать.

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP — лёгкий MCP server, который записывает сессии Codex CLI в структурированные логи, с локальным HTML viewer и опциональным launcher для быстрого продолжения.

## Quickstart

Установите пакет MCP server:

```bash
cd mcp/agent-recorder
npm install
```

Зарегистрируйте и запустите через Codex CLI (путь отредактируйте):

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- Запись сессий Codex CLI в JSONL/Markdown
- Разделение логов по типам (chat / system notes / tool logs)
- Имя файла включает project, title, session id, timestamp
- Статический HTML viewer с поиском и фильтрами
- Генерация контекста для продолжения
- Гибкая настройка через переменные окружения

## FAQ (Top 3)

**Q1: Где сохраняются логи?**
По умолчанию в `~/Desktop/ai agent record`, можно изменить через `AI_AGENT_RECORD_DIR`.

**Q2: Можно ли сделать имена файлов более читаемыми?**
Берётся первая фраза пользователя для title; настройте `AI_AGENT_RECORD_TITLE_FROM_USER` и `AI_AGENT_RECORD_TITLE_MAX`.

**Q3: Как включить tool calls / tool outputs?**
Установите `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` и/или `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`.

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
