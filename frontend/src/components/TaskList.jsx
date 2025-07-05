import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Cargar tareas al montar
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [API_URL]);

  // Eliminar tareas
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Tareas</h2>
        <Link to="/new" className="btn btn-primary">
          + Nueva tarea
        </Link>
      </div>

      {tasks.lenght === 0 ? (
        <div className="alert alert-info">No hay tareas todavía.</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Título / Descripción</th>
              <th>Creada</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={deleteTask} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
