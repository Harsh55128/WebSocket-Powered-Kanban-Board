const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Task = require("./models/Task");

dotenv.config(); // ✅ MUST be called

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// WebSocket logic
io.on("connection", async (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Initial sync
  try {
    const tasks = await Task.find();
    socket.emit("sync:tasks", tasks);
  } catch (err) {
    console.error("❌ Sync error:", err);
  }

  // Create task
  socket.on("task:create", async (data) => {
    try {
      const task = await Task.create(data);
      io.emit("task:created", task);
    } catch (err) {
      console.error("❌ Create error:", err);
    }
  });

  // Update task
  socket.on("task:update", async ({ id, updates }) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );
      io.emit("task:updated", updatedTask);
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  });

  // Move task
  socket.on("task:move", async ({ id, status }) => {
    try {
      const movedTask = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      io.emit("task:moved", movedTask);
    } catch (err) {
      console.error("❌ Move error:", err);
    }
  });

  // Delete task
  socket.on("task:delete", async (id) => {
    try {
      await Task.findByIdAndDelete(id);
      io.emit("task:deleted", id);
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
