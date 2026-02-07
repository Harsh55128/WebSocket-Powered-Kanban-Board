import { render, screen } from "@testing-library/react";
import KanbanBoard from "../../components/KanbanBoard";

test("task appears in correct column", () => {
  const tasks = [
    { _id: "1", title: "Drag Me", status: "todo" },
  ];

  render(<KanbanBoard tasks={tasks} />);

  expect(screen.getByText("Drag Me")).toBeInTheDocument();
});
