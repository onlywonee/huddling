# Codex 개발 환경 실행 확인

확인일: 2026-10-13

## 실제 확인한 범위

| 항목 | 확인 결과와 범위 |
| --- | --- |
| Next.js / TypeScript 5 / Tailwind CSS v4 | 린트, 타입 검사, 프로덕션 빌드 통과 |
| 한국어 주석 스킬 | 임시 TypeScript 파일에 설명 주석을 추가. 주석 제외 컴파일 결과 동일, 대상 lint/typecheck 통과 |
| design-token-checker | 초기 UI 소스에서 직접 입력한 색상·크기를 검출. 토큰 선언과 일반 레이아웃 값을 오탐으로 처리하지 않음 |
| ui-reviewer | 실제 UI 코드를 검토해 파일·줄 번호와 미검사 항목을 보고 |
| token-checker | 부모가 원본·생성 CSS 일치를 확인. 에이전트 호출 검증은 외부 연결 장애 시점에 중단되어 미완료. 실제 Figma 동기화는 미검사 |
| figma-implementer | 부모가 구현 도구·예제·설정 준비 확인. 에이전트 호출 검증은 외부 연결 장애 시점에 중단되어 미완료. 실제 Figma 노드 구현은 미검사 |
| Style Dictionary | 밝은·어두운 토큰 JSON으로부터 CSS 생성 명령 통과 |
| Vitest | 버튼 클릭 콜백과 disabled 동작 검사 2개 통과 |
| Storybook | 컴포넌트 4파일 예제, autodocs, 두 story와 play 함수, 정적 빌드 통과 |
| 브라우저 | Chrome에서 375px 초기 화면 가로 넘침 없음, Storybook 밝은·어두운 토큰 및 비활성 상태 검사 3개 통과 |
| Figma 연결 | 현재 Codex 데스크톱의 whoami 인증 요청 성공. 특정 파일의 권한·디자인 조회는 미검사 |

서브에이전트 실행 확인은 일반 서브에이전트가 지정 TOML의 developer_instructions를 읽는 방식으로 수행했다. 현재 세션의 위임 도구에는 커스텀 유형 선택 인자가 없으므로 커스텀 유형 자동 로드는 검증하지 못했다. AGENTS.md에 이 환경의 호출 경로를 명시했다.

## 남은 자료와 작업

- 실제 Figma 노드 URL과 해당 테마/모드. get_design_context·get_screenshot·get_variable_defs로 해당 디자인을 읽은 뒤 구현과 비교를 검증해야 한다.
- Code Connect의 실제 매핑은 아직 없다. 존재하지 않는 매핑 파일이나 연결을 검증 완료로 표시하지 않는다.
- 현재 Button은 개발 환경 검증용 예제다. 초기 Next.js 첫 화면의 하드코딩 후보는 검사 결과로 확인했으며 Figma 최종 화면을 구현한 것은 아니다.
- RRD.md의 초대장 만들기·발행·참석 응답·응답 현황 기능은 아직 구현되지 않았다. 이 문서의 통과 결과는 개발 도구의 실행 확인이다.

## 재실행 명령

```bash
npm ci
npm run build:tokens
npm run lint
npm run typecheck
npm run test
npm run build
npm run build-storybook
npm run test:browser
```

브라우저 검사는 Google Chrome 설치를 사용한다. Codex에서 검사 담당자에게 요청할 때는 AGENTS.md의 위임 지침을 따른다. 외부 Figma 연결은 현재 Codex 세션에서 제공되는 플러그인을 상속한다.

브라우저 검사에서는 두 Storybook play 함수가 실제 실행되고 assertion을 통과한 표시도 확인했다. 실행 중 외부 네트워크 연결이 끊겨 개발 서버의 Google Fonts 다운로드가 실패했고 기본 대체 글꼴로 표시됐다. 따라서 이 결과를 특정 Figma 글꼴과의 시각적 일치 검증으로 사용하면 안 된다.
