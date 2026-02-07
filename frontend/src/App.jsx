import { useEffect, useState } from "react";
import { socket } from "./socket/socket";
import KanbanBoard from "./components/KanbanBoard";
import CreateTask from "./components/CreateTask";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to WebSocket");
    });

    socket.on("sync:tasks", (serverTasks) => {
      setTasks(serverTasks);
      setLoading(false);
    });

    socket.on("task:created", (task) => {
      setTasks((prev) => [...prev, task]);
    });

    socket.on("task:updated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    });

    socket.on("task:moved", (movedTask) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === movedTask._id ? movedTask : t))
      );
    });

    socket.on("task:deleted", (id) => {
      setTasks((prev) => prev.filter((t) => t._id !== id));
    });

    return () => socket.off();
  }, []);

  if (loading) return <div className="loader">Loading tasks...</div>;

  return (
    <div className="app">
      {/* 🔹 HEADER */}
      <header className="app-header">
        <div className="brand">
          <span className="logo">📊</span>
          <h1>TaskFlow</h1>
        </div>
      </header>

      {/* 🔹 MAIN */}
      <main className="app-main">
        <section className="task-create">
          <CreateTask />
        </section>

        <section className="kanban-wrapper">
          <KanbanBoard tasks={tasks} />
        </section>
      </main>
    </div>
  );
}

export default App;

