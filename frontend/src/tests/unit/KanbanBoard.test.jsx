import { render, screen } from "@testing-library/react";
import KanbanBoard from "../../components/KanbanBoard";

// TODO: Add more unit tests for individual components

const mockTasks = [
  { _id: "1", title: "Task 1", status: "todo" },
  { _id: "2", title: "Task 2", status: "done" },
];

test("renders kanban columns", () => {
  render(<KanbanBoard tasks={mockTasks} />);

  expect(screen.getByText("To Do")).toBeInTheDocument();
  expect(screen.getByText("In Progress")).toBeInTheDocument();
  expect(screen.getByText("Done")).toBeInTheDocument();
});
