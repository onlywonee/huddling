import StyleDictionary from "style-dictionary";

// 초기 Next.js 화면의 기존 색상을 원본으로 사용합니다. Figma 확정 후 갱신합니다.
for (const mode of ["light", "dark"]) {
  const dictionary = new StyleDictionary({
    source: [`tokens/${mode}.json`],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "src/tokens/",
        files: [
          {
            destination: mode === "light" ? "_generated.css" : "_generated-dark.css",
            format: "css/variables",
            options: { selector: ":root", outputReferences: true },
          },
        ],
      },
    },
  });
  await dictionary.buildAllPlatforms();
}
