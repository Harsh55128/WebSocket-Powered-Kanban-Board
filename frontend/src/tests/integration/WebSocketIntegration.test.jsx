import { describe, test, expect, vi } from "vitest";
import { socket } from "../../socket/socket";

test("socket emits task:create", () => {
  socket.emit = vi.fn();

  socket.emit("task:create", { title: "New Task" });

  expect(socket.emit).toHaveBeenCalledWith(
    "task:create",
    expect.any(Object)
  );
});
