# Agent Recorder MCP

> 英文 README 是唯一權威版本，譯文可能滯後。

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP 是一個輕量級 MCP server，用於把 Codex CLI 會話記錄為結構化日誌，並提供本地 HTML viewer 與可選 launcher 方便續聊。

## Quickstart

安裝 MCP server 套件：

```bash
cd mcp/agent-recorder
npm install
```

用 Codex CLI 註冊並執行（記得調整路徑）：

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- 將 Codex CLI 會話記錄為 JSONL/Markdown
- 可按類型拆分日誌（chat / system notes / tool logs）
- 檔名包含 project、title、session id、timestamp
- 提供靜態 HTML viewer，支援搜尋與過濾
- 可一鍵產生續接上下文
- 透過環境變數彈性設定

## FAQ (Top 3)

**Q1：日誌保存在哪裡？**
預設在 `~/Desktop/ai agent record`，可用 `AI_AGENT_RECORD_DIR` 修改。

**Q2：可以讓檔名更好讀嗎？**
預設使用第一條使用者訊息產生 title，可用 `AI_AGENT_RECORD_TITLE_FROM_USER` 與 `AI_AGENT_RECORD_TITLE_MAX` 控制。

**Q3：如何記錄 tool calls / tool outputs？**
設定 `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` 和/或 `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`。

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
