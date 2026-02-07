# 📝 WebSocket-Powered Kanban Board
### Real-Time Task Management System with WebSockets & Automated Testing

---

## 📌 Project Overview

This project is a **real-time Kanban Board application** built to demonstrate modern frontend architecture, WebSocket-based synchronization, and robust automated testing.

Users can create, update, delete, categorize, prioritize, and move tasks across workflow stages while **instantly syncing changes across multiple browser sessions** using **WebSockets (Socket.IO)**.

The project focuses heavily on **code quality, scalability, and testing discipline**.

---

## 🎯 Key Objectives

- Real-time task synchronization
- Clean, modular React architecture
- Strong unit, integration, and E2E testing
- Production-safe deployment

---

## 🧠 Key Concepts Demonstrated

- Real-time communication using WebSockets (Socket.IO)
- Component-driven React architecture
- Drag-and-drop workflow management
- State synchronization across browser tabs
- Layered testing strategy
- Clean code & separation of concerns

---

## 🏗️ Tech Stack

### Frontend

- React
- Drag & Drop API
- Socket.IO Client
- Vitest
- React Testing Library
- Playwright (E2E Testing)

### Backend

- Node.js
- Express
- Socket.IO (WebSockets)

---

## 📂 Project Structure

websocket-kanban-vitest-playwright
│── backend/
│ ├── server.js
│ ├── package.json
│
│── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── KanbanBoard.jsx
│ │ │ ├── TaskCard.jsx
│ │ ├── tests/
│ │ │ ├── unit/
│ │ │ ├── integration/
│ │ │ ├── e2e/
│ ├── playwright.config.js
│ ├── package.json
│
└── README.md


---

## 📌 Kanban Board Features

### Core Features

- Create tasks with title
- Update task priority (Low / Medium / High)
- Update task category (Bug / Feature / Enhancement)
- Delete tasks
- Move tasks between columns:
  - To Do
  - In Progress
  - Done
- Drag & drop support
- Real-time updates across browser tabs

---

## 🔌 WebSocket Implementation

### Events Used

| Event Name     | Description                           |
|---------------|---------------------------------------|
| task:create   | Create a new task                     |
| task:update   | Update priority or category           |
| task:move     | Move task between columns             |
| task:delete   | Delete a task                         |
| sync:tasks    | Sync all tasks for new connections    |

### Benefits

- No polling
- Instant UI updates
- Event-driven architecture
- Multi-client state consistency

---

## 🧪 Testing Strategy

Testing was treated as a **first-class citizen** in this project.

### Unit Testing

**Tools:** Vitest + React Testing Library  
**Location:** `src/tests/unit/`

Covered:
- Component rendering
- Priority change logic
- Category change logic
- Controlled form inputs
- State updates

---

### Integration Testing

**Tools:** Vitest  
**Location:** `src/tests/integration/`

Covered:
- WebSocket event handling
- Drag-and-drop behavior
- State synchronization

---

### End-to-End Testing

**Tools:** Playwright  
**Location:** `src/tests/e2e/`

Covered:
- Creating tasks
- Updating priority and category
- Dragging tasks between columns
- Real-time sync across multiple tabs

> Note: E2E tests are optional and excluded from production builds.

---

## ▶️ How to Run the Project

### Backend

```bash
cd backend
npm install
npm run dev

###Frontend
cd frontend
npm install
npm run dev
Application runs at:
http://localhost:3000

🧪 Running Tests
Unit & Integration Tests
npm run test
E2E Tests (Optional)
npx playwright install
npx playwright test
🚀 Deployment Safety
Tests excluded from production builds

No Playwright dependency in production

Independent backend server

Lightweight frontend bundle

CI/CD friendly

📊 Evaluation Alignment
Criteria	Status
WebSocket Real-time Sync	✅
React Architecture	✅
Testing Coverage	✅
E2E Testing	✅
Code Quality	✅
UI/UX	✅
🏁 Final Notes
This project demonstrates:

Real-time system design

Test-driven frontend development

Scalable architecture

Production-ready mindset

🙌 Author
Harsh Rajpoot
Frontend Developer | React | WebSockets | Testing Enthusiast