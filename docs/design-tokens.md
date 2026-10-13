# 디자인 토큰 매핑

현재 원본은 Next.js 초기 화면에서 가져온 기본 색상이며 Figma 확정 토큰이 아닙니다.

| 용도 | CSS 변수 | 밝은 모드 | 어두운 모드 | 원본 |
| --- | --- | --- | --- | --- |
| 배경 | `--background` | `#ffffff` | `#0a0a0a` | `tokens/light.json`, `tokens/dark.json` |
| 글자 | `--foreground` | `#171717` | `#ededed` | `tokens/light.json`, `tokens/dark.json` |

`npm run build:tokens`는 Style Dictionary를 사용해 `src/tokens/_generated.css`와 `_generated-dark.css`를 생성합니다. 두 파일은 직접 수정하지 않습니다. `globals.css`가 밝은 모드와 OS 다크 모드 조건에 맞게 가져옵니다.

Tailwind 연결은 `--color-background`, `--color-foreground`입니다. 글꼴은 `globals.css`의 `--font-sans`, `--font-mono`와 `next/font`에서 관리합니다. 아직 간격·크기·반경의 Figma 매핑은 없습니다.

Figma 노드 URL과 해당 모드가 제공되면 token-checker가 비교한 뒤 요청 범위에서 원본과 이 문서를 갱신합니다. 노드에서 반환되지 않은 변수를 삭제로 단정하지 않습니다.
