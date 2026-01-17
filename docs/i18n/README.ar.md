# Agent Recorder MCP

> ملف README بالإنجليزية هو المصدر المعتمد. قد تتأخر الترجمات.

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP هو خادم MCP خفيف يسجل جلسات Codex CLI في سجلات منظمة، مع HTML viewer محلي و launcher اختياري لاستئناف المحادثات بسرعة.

## Quickstart

ثبّت حزمة MCP server:

```bash
cd mcp/agent-recorder
npm install
```

سجّل وشغّل عبر Codex CLI (عدّل المسار):

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- تسجيل جلسات Codex CLI بصيغة JSONL/Markdown
- تقسيم السجلات حسب النوع (chat / system notes / tool logs)
- اسم الملف يحتوي project و title و session id و timestamp
- HTML viewer ثابت مع بحث وتصفية
- إنشاء سياق للاستكمال بسرعة
- إعداد مرن عبر متغيرات البيئة

## FAQ (Top 3)

**Q1: أين تُحفظ السجلات؟**
افتراضيًا في `~/Desktop/ai agent record` ويمكن التغيير عبر `AI_AGENT_RECORD_DIR`.

**Q2: هل يمكن جعل أسماء الملفات أكثر وضوحًا؟**
يتم أخذ أول رسالة مستخدم كـ title؛ اضبط `AI_AGENT_RECORD_TITLE_FROM_USER` و `AI_AGENT_RECORD_TITLE_MAX`.

**Q3: كيف أضمّن tool calls / tool outputs؟**
اضبط `AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` و/أو `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`.

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
