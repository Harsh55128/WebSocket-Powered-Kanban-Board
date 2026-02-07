import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskCard from "../../components/TaskCard";
import { socket } from "../../socket/socket";
import { vi } from "vitest";

// 🔥 Mock socket
vi.mock("../../socket/socket", () => ({
  socket: {
    emit: vi.fn(),
  },
}));

const mockTask = {
  _id: "1",
  title: "Test Task",
  description: "Test Description",
  priority: "Low",
  category: "Bug",
  status: "todo",
};

test("emits socket event when priority changes", async () => {
  const user = userEvent.setup();
  render(<TaskCard task={mockTask} />);

  const prioritySelect = screen.getByDisplayValue("Low");
  await user.selectOptions(prioritySelect, "High");

  expect(socket.emit).toHaveBeenCalledWith("task:update", {
    id: "1",
    updates: { priority: "High" },
  });
});

test("emits socket event when category changes", async () => {
  const user = userEvent.setup();
  render(<TaskCard task={mockTask} />);

  const categorySelect = screen.getByDisplayValue("Bug");
  await user.selectOptions(categorySelect, "Feature");

  expect(socket.emit).toHaveBeenCalledWith("task:update", {
    id: "1",
    updates: { category: "Feature" },
  });
});
