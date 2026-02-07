import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { socket } from "../socket/socket";

const priorityColors = {
  Low: "#4caf50",
  Medium: "#ff9800",
  High: "#f44336",
};

const categoryColors = {
  Bug: "#e53935",
  Feature: "#1e88e5",
  Improvement: "#43a047",
};

export default function TaskCard({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const emitUpdate = (updates) => {
    socket.emit("task:update", {
      id: task._id,
      updates,
    });
  };

  // 🔹 Mock Attachment Upload
  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newAttachment = {
      name: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      type: file.type,
    };

    emitUpdate({
      attachments: [...(task.attachments || []), newAttachment],
    });
  };

  const removeAttachment = (index) => {
    const updated = task.attachments.filter((_, i) => i !== index);
    emitUpdate({ attachments: updated });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    border: "1px solid #ddd",
    padding: "12px",
    marginBottom: "12px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Drag Handle */}
      <div
        {...listeners}
        {...attributes}
        style={{
          cursor: "grab",
          fontWeight: "bold",
          marginBottom: "8px",
          background: "#f4f4f4",
          padding: "6px",
          borderRadius: "6px",
          textAlign: "center",
        }}
      >
        ⠿ Drag Task
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
        <span
          style={{
            background: priorityColors[task.priority],
            color: "#fff",
            padding: "3px 10px",
            borderRadius: "14px",
            fontSize: "12px",
          }}
        >
          {task.priority}
        </span>

        <span
          style={{
            background: categoryColors[task.category],
            color: "#fff",
            padding: "3px 10px",
            borderRadius: "14px",
            fontSize: "12px",
          }}
        >
          {task.category}
        </span>

        {task.attachments?.length > 0 && (
          <span
            style={{
              background: "#555",
              color: "#fff",
              padding: "3px 8px",
              borderRadius: "14px",
              fontSize: "12px",
            }}
          >
            📎 {task.attachments.length}
          </span>
        )}
      </div>

      {/* Content */}
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "6px" }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <button
            onClick={() => {
              emitUpdate({ title, description });
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p style={{ fontSize: "14px", color: "#555" }}>
            {task.description}
          </p>

          <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => socket.emit("task:delete", task._id)}>
              Delete
            </button>
          </div>
        </>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
        <select
          value={task.priority}
          onChange={(e) => emitUpdate({ priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={task.category}
          onChange={(e) => emitUpdate({ category: e.target.value })}
        >
          <option>Bug</option>
          <option>Feature</option>
          <option>Improvement</option>
        </select>
      </div>

      {/* 🔹 Attachments */}
      <div style={{ marginTop: "10px" }}>
        <label style={{ cursor: "pointer", color: "#1e88e5" }}>
          📎 Attach File
          <input type="file" hidden onChange={handleAttachment} />
        </label>

        {task.attachments?.length > 0 && (
          <ul style={{ marginTop: "6px", fontSize: "13px" }}>
            {task.attachments.map((file, index) => (
              <li key={index}>
                {file.name} ({file.size})
                <button
                  onClick={() => removeAttachment(index)}
                  style={{ marginLeft: "6px" }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

