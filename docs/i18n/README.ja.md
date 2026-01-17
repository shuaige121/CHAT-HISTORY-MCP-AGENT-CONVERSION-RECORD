# Agent Recorder MCP

> 英語版 README が正本です。翻訳は遅れる可能性があります。

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP は、Codex CLI のセッションを構造化ログとして記録し、ローカル HTML viewer と任意の launcher で素早く続きから再開できます。

## Quickstart

MCP server パッケージをインストール：

```bash
cd mcp/agent-recorder
npm install
```

Codex CLI に登録して起動（パスは調整してください）：

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- Codex CLI セッションを JSONL/Markdown に記録
- 種別ごとにログ分割（chat / system notes / tool logs）
- ファイル名に project、title、session id、timestamp を含む
- 静的 HTML viewer で検索・フィルタ
- 続き用のコンテキストを簡単に生成
- 環境変数で柔軟に設定可能

## FAQ (Top 3)

**Q1：ログはどこに保存されますか？**
デフォルトは `~/Desktop/ai agent record`。`AI_AGENT_RECORD_DIR` で変更できます。

**Q2：ファイル名を読みやすくできますか？**
最初のユーザー発言から title を生成します。`AI_AGENT_RECORD_TITLE_FROM_USER` と `AI_AGENT_RECORD_TITLE_MAX` で調整可能です。

**Q3：tool calls / tool outputs を記録するには？**
`AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` と/または `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true` を設定してください。

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
