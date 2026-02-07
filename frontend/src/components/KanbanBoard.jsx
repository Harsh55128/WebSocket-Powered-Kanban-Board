import { DndContext, closestCenter } from "@dnd-kit/core";
import Column from "./Column";
import { socket } from "../socket/socket";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function KanbanBoard({ tasks }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    socket.emit("task:move", {
      id: active.id,
      status: over.id,
    });
  };

  const isMobile = window.innerWidth < 768;

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={styles.boardWrapper(isMobile)}>
        {columns.map((column) => (
          <div key={column.id} style={styles.columnWrapper(isMobile)}>
            <Column
              id={column.id}
              title={column.title}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          </div>
        ))}
      </div>
    </DndContext>
  );
}

/* ================= STYLES ================= */

const styles = {
  boardWrapper: (isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "16px",
    height: isMobile ? "auto" : "calc(100vh - 80px)",
    padding: "16px",
    background: "#f4f6f8",
    overflowY: isMobile ? "auto" : "hidden",
  }),

  columnWrapper: (isMobile) => ({
    flex: isMobile ? "unset" : "1",
    height: isMobile ? "auto" : "100%",
    minHeight: isMobile ? "300px" : "unset",
    background: "#ffffff",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  }),
};
