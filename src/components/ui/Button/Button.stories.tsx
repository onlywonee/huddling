import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Setup/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "확인", onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "확인" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
    canvasElement.dataset.playVerified = "true";
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button")).toBeDisabled();
    canvasElement.dataset.playVerified = "true";
  },
};
