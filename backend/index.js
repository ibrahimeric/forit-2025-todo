require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = []; //array en memoria
let idCounter = 1;

// GET todas las tareas
app.get('/api/tasks', (req, rest) => {
    rest.json(tasks);
})

// POST crear tarea
app.post('/api/tasks', (req, res) => {
    const { title, completed } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const task = { id: idCounter++, title, completed: !!completed };
    tasks.push(task);
    res.status(201).json(task);
});

// PUT actualizar tarea
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id == id);
    if(index === -1) return res.status(404).json({ error: 'Task not found' });

    tasks.splice(index, 1);
    res.status(204).end();
});

// DELETE eliminar tarea
app.delete('/api/taks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    tasks.splice(index, 1);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});