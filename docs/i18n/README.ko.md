# Agent Recorder MCP

> 영어 README가 기준입니다. 번역은 지연될 수 있습니다.

**Languages:** [English](../../README.md) | [简体中文](README.zh-Hans.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md) | [العربية](README.ar.md) | [हिन्दी](README.hi.md) | [Bahasa Indonesia](README.id.md)

Agent Recorder MCP는 Codex CLI 세션을 구조화된 로그로 기록하고, 로컬 HTML viewer와 선택적 launcher로 빠르게 대화를 이어갈 수 있게 해줍니다.

## Quickstart

MCP server 패키지 설치:

```bash
cd mcp/agent-recorder
npm install
```

Codex CLI에 등록 후 실행(경로를 조정하세요):

```bash
codex mcp add agent-recorder -- node /path/to/mcp/agent-recorder/server.mjs
codex
```

## Key Features

- Codex CLI 세션을 JSONL/Markdown으로 기록
- 유형별 로그 분리(chat / system notes / tool logs)
- 파일명에 project, title, session id, timestamp 포함
- 정적 HTML viewer에서 검색/필터
- 이어가기 컨텍스트 자동 생성
- 환경 변수로 유연한 설정

## FAQ (Top 3)

**Q1: 로그는 어디에 저장되나요?**
기본 경로는 `~/Desktop/ai agent record`이며 `AI_AGENT_RECORD_DIR`로 변경할 수 있습니다.

**Q2: 파일명을 읽기 쉽게 만들 수 있나요?**
첫 번째 사용자 메시지에서 title을 만들며 `AI_AGENT_RECORD_TITLE_FROM_USER`와 `AI_AGENT_RECORD_TITLE_MAX`로 조정합니다.

**Q3: tool calls / tool outputs를 기록하려면?**
`AI_AGENT_RECORD_INCLUDE_FUNCTION_CALLS=true` 및/또는 `AI_AGENT_RECORD_INCLUDE_FUNCTION_OUTPUTS=true`를 설정하세요.

## More documentation

- Full usage → [README.md#usage](../../README.md#usage)
- Configuration → [README.md#configuration](../../README.md#configuration)
- Troubleshooting → [README.md#troubleshooting](../../README.md#troubleshooting)
- Contributing → [README.md#contributing](../../README.md#contributing)
