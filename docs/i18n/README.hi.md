# Agent Recorder MCP

> अंग्रेज़ी README ही source of truth है। अनुवाद देर से हो सकते हैं।

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP एक हल्का MCP server है जो Codex CLI sessions को संरचित logs में रिकॉर्ड करता है, साथ ही local HTML viewer और optional launcher से जल्दी बातचीत जारी की जा सकती है।

## Quickstart

MCP server पैकेज इंस्टॉल करें:

```bash
cd mcp/agent-recorder
npm install
```

Codex CLI से रजिस्टर करके चलाएँ (पाथ बदलें):

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- Codex CLI sessions को JSONL/Markdown में रिकॉर्ड करता है
- प्रकार के अनुसार logs अलग करता है (chat / system notes / tool logs)
- फ़ाइल नाम में project, title, session id, timestamp शामिल
- static HTML viewer में search और filter
- जल्दी से resume context बनाता है
- environment variables से configuration

## FAQ (Top 3)

**Q1: logs कहाँ सेव होते हैं?**
डिफ़ॉल्ट `~/Desktop/ai agent record` है, `AI_AGENT_RECORD_DIR` से बदल सकते हैं।

**Q2: फ़ाइल नाम पढ़ने योग्य कैसे रखें?**
पहली user message से title बनता है; `AI_AGENT_RECORD_TITLE_FROM_USER` और `AI_AGENT_RECORD_TITLE_MAX` सेट करें।

**Q3: tool calls / tool outputs कैसे जोड़ें?**
`AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` और/या `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true` सेट करें।

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
