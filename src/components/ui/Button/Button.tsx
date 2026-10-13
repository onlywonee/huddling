import type { ButtonHTMLAttributes } from "react";

// 개발 도구 검증용 기본 버튼입니다. Figma 디자인은 아직 적용하지 않았습니다.
export function Button({ children, style, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      style={{ background: "var(--background)", color: "var(--foreground)", ...style }}
    >
      {children}
    </button>
  );
}
