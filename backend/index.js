require("dotenv").config();

const express = require("express");
const cors = require("cors");
const tasks = require("./data/tasks");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); //habilita CORS
app.use(express.json());

/* let tasks = []; //array en memoria */
let idCounter = 1;

// GET todas las tareas
app.get("/api/tasks", (req, rest) => {
  rest.json(tasks);
});

// POST crear tarea
app.post("/api/tasks", (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const task = {
    id: String(idCounter++), /* id como string para igual el formato */
    title,
    description: req.body.description || "",
    completed: !!completed,
    createdAt: new Date(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT actualizar tarea
app.put("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex((t) => t.id == id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  // Actualizar la tarea
  tasks[index].title = req.body.title;
  tasks[index].description = req.body.description;
  tasks[index].completed = req.body.completed;

  res.json(tasks[index]);
});

// DELETE eliminar tarea
app.delete("/api/taks/:id", (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex((t) => t.id === id); // compara strings

  if (index === -1) return res.status(404).json({ error: "Task not found" });
  
  tasks.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
