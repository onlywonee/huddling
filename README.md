# Huddling

모바일 웹 초대장 제작 서비스의 초기 프로젝트입니다. 요구사항은 RRD.md, Codex 작업 규칙은 AGENTS.md에 있습니다. 현재는 초기 화면과 개발 환경만 준비되어 있으며 초대장 발행·응답 기능은 아직 구현하지 않았습니다.

## 실행

Next.js, TypeScript 5, Tailwind CSS v4와 npm을 사용합니다.

```bash
npm ci
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다. 첫 화면은 src/app/page.tsx, 전역 스타일과 기본 토큰은 src/app/globals.css에 있습니다.

```bash
npm run lint
npm run typecheck
npm run build
```

## Codex 설정

- .codex/config.toml: 서브에이전트 사용 활성화
- .codex/agents/design-token-checker.toml: 하드코딩과 토큰 미적용 검사
- .codex/agents/ui-reviewer.toml: 토큰·Figma 정렬·375px 모바일 검사
- .codex/agents/figma-implementer.toml: Figma 디자인 구현
- .codex/agents/token-checker.toml: Figma·코드 토큰 비교와 요청된 수정
- .agents/skills/korean-code-comments/SKILL.md: 한국어 설명 주석 스킬

에이전트는 부모 Codex의 모델과 도구 연결을 상속합니다. Claude의 Sonnet 모델, Claude/Cursor 전용 도구명, 프로젝트 메모리 설정은 사용하지 않습니다. 이전 에이전트 정의는 Git 기록에서 복구할 수 있습니다.

현재 위임 도구처럼 커스텀 유형 선택 기능이 없는 환경에서는 일반 서브에이전트가 해당 TOML 파일의 지침을 읽고 수행하도록 AGENTS.md에 호출 방법을 정의했습니다. 이는 커스텀 유형 자동 로드와는 다른 지침 전달 방식입니다.

Codex에서 이 프로젝트를 열고 아래처럼 요청합니다.

```text
design-token-checker 에이전트로 src 폴더의 하드코딩을 검사해줘.
ui-reviewer 에이전트로 src/app/page.tsx를 검토해줘. Figma 기준은 [노드 URL]이야.
figma-implementer 에이전트로 이 Figma 디자인을 구현해줘: [노드 URL]
token-checker 에이전트로 이 Figma 노드와 코드 토큰을 비교해줘: [노드 URL]
$korean-code-comments src/app/page.tsx에 한국어 설명 주석 달아줘.
```

설정이 현재 대화에 나타나지 않으면 프로젝트를 다시 열거나 새 Codex 세션을 시작합니다. 에이전트 정의의 등록과 실제 Figma 디자인 검증은 별개입니다. Figma 작업에는 연결된 플러그인과 fileKey·nodeId를 확인할 수 있는 노드 URL이 필요합니다. URL 없이 특정 디자인과 일치한다고 검증할 수 없습니다.

## 컴포넌트·토큰 개발 도구

Storybook 10, Vitest 5, Style Dictionary 5와 Playwright를 설정했습니다. Node.js 22.12 이상이 필요하며 브라우저 검사는 Google Chrome을 사용합니다.

```bash
npm run build:tokens
npm run test
npm run storybook
npm run build-storybook
npm run test:browser
```

Storybook은 http://localhost:6006 에서 확인합니다. `src/components/ui/Button`은 실행 검증용 기본 예제이며 Figma 최종 디자인이 아닙니다. Storybook의 play 함수는 현재 버전의 `storybook/test`를 사용합니다. Storybook 전역 CSS는 `scripts/storybook-tailwind.ts`에서 Next.js와 같은 Tailwind 엔진으로 처리합니다.

원본 토큰은 `tokens/light.json`, `tokens/dark.json`이며 생성 파일은 직접 수정하지 않습니다. [토큰 매핑](docs/design-tokens.md)에서 현재 값을 확인합니다. Figma 토큰과의 실제 비교는 노드 URL이 제공된 뒤 수행합니다.

공식 설정 형식: [Codex 서브에이전트](https://learn.chatgpt.com/docs/agent-configuration/subagents), [Codex 스킬](https://learn.chatgpt.com/docs/build-skills).
