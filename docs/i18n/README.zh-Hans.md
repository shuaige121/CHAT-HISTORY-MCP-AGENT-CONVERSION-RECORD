# Agent Recorder MCP

> 英文 README 是唯一权威版本，译文可能滞后。

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP 是一个轻量级 MCP server，用于把 Codex CLI 会话记录为结构化日志，并提供本地 HTML viewer 与可选 launcher 便于续聊。

## Quickstart

安装 MCP server 包：

```bash
cd mcp/agent-recorder
npm install
```

用 Codex CLI 注册并运行（记得调整路径）：

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- 将 Codex CLI 会话记录为 JSONL/Markdown
- 可按类型拆分日志（chat / system notes / tool logs）
- 文件名包含 project、title、session id、timestamp
- 提供静态 HTML viewer，支持搜索与过滤
- 可一键生成续接上下文
- 通过环境变量灵活配置

## FAQ (Top 3)

**Q1：日志保存在哪里？**
默认在 `~/Desktop/ai agent record`，可用 `AI_AGENT_RECORD_DIR` 修改。

**Q2：能让文件名更可读吗？**
默认用首条用户消息生成 title，可用 `AI_AGENT_RECORD_TITLE_FROM_USER` 与 `AI_AGENT_RECORD_TITLE_MAX` 控制。

**Q3：如何记录 tool calls / tool outputs？**
设置 `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` 和/或 `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`。

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
