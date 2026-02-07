import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({ id, title, tasks }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} style={styles.column(isOver)}>
      {/* Column Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <span style={styles.count}>{tasks.length}</span>
      </div>

      {/* Scrollable Task Area */}
      <div style={styles.taskList}>
        {tasks.length === 0 ? (
          <p style={styles.emptyText}>No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  column: (isOver) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    borderRadius: "12px",
    border: isOver ? "2px dashed #1976d2" : "1px solid #e0e0e0",
    transition: "0.2s ease",
  }),

  header: {
    padding: "14px 16px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fafafa",
    borderRadius: "12px 12px 0 0",
  },

  title: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    color: "#333",
  },

  count: {
    fontSize: "13px",
    background: "#1976d2",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "12px",
  },

  taskList: {
    flex: 1,
    padding: "12px",
    overflowY: "auto",
    scrollbarWidth: "thin",
  },

  emptyText: {
    textAlign: "center",
    marginTop: "40px",
    color: "#999",
    fontSize: "14px",
  },
};
