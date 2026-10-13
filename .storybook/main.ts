import type { StorybookConfig } from "@storybook/nextjs-vite";
import { storybookTailwind } from "../scripts/storybook-tailwind";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/nextjs-vite",
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), storybookTailwind()];
    return config;
  },
};

export default config;
