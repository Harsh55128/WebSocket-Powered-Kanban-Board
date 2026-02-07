import { useState } from "react";
import { socket } from "../socket/socket";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Feature");
  const [attachments, setAttachments] = useState([]);

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFile = {
      name: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      type: file.type,
    };

    setAttachments((prev) => [...prev, newFile]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    socket.emit("task:create", {
      title,
      description,
      priority,
      category,
      attachments,
      status: "todo",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategory("Feature");
    setAttachments([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "24px",
        padding: "16px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>➕ Create New Task</h3>

      {/* Title */}
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />

      {/* Description */}
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...inputStyle, height: "70px" }}
      />

      {/* Priority & Category */}
      <div style={{ display: "flex", gap: "10px" }}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={inputStyle}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option>Feature</option>
          <option>Bug</option>
          <option>Improvement</option>
        </select>
      </div>

      {/* Attachments */}
      <div style={{ marginTop: "10px" }}>
        <label
          style={{
            cursor: "pointer",
            color: "#1e88e5",
            fontWeight: "500",
          }}
        >
          📎 Attach file
          <input type="file" hidden onChange={handleAttachment} />
        </label>

        {attachments.length > 0 && (
          <ul style={{ marginTop: "6px", fontSize: "13px" }}>
            {attachments.map((file, index) => (
              <li key={index}>
                {file.name} ({file.size})
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  style={{
                    marginLeft: "6px",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        style={{
          marginTop: "14px",
          padding: "10px",
          width: "100%",
          background: "#1e88e5",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Create Task
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};
