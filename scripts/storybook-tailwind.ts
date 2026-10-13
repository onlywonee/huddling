import { dirname, resolve } from "node:path";
import { compile } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";
import type { Plugin } from "vite";

// Next.js에서 사용하는 동일한 Tailwind 엔진으로 Storybook의 전역 CSS를 컴파일합니다.
export function storybookTailwind(): Plugin {
  return {
    name: "huddling-tailwind",
    enforce: "pre",
    async transform(source, id) {
      const file = id.split("?")[0];
      if (file !== resolve("src/app/globals.css")) return;
      const compiler = await compile(source, {
        base: dirname(file),
        from: file,
        onDependency: (dependency) => this.addWatchFile(dependency),
      });
      const scanner = new Scanner({
        sources: [{ base: resolve("src"), pattern: "**/*.{ts,tsx}", negated: false }],
      });
      const candidates = scanner.scan();
      for (const dependency of scanner.files) this.addWatchFile(dependency);
      return { code: compiler.build(candidates), map: null };
    },
  };
}
