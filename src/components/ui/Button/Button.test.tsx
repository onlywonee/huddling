import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("호출자가 전달한 클릭 동작을 실행한다", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>응답 제출</Button>);
    fireEvent.click(screen.getByRole("button", { name: "응답 제출" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("비활성 상태에서는 클릭 동작을 실행하지 않는다", () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>응답 제출</Button>);
    fireEvent.click(screen.getByRole("button", { name: "응답 제출" }));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
