import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/tasks`)
        .then((res) => res.json())
        .then((data) => {
          const task = data.find((t) => t.id === id);
          if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setCompleted(task.completed);
          }
        })
        .catch((err) => console.error("Error fetching task:", err));
    }
  }, [id, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      completed,
    };

    console.log(taskData) // Verificar que datos se envían bien al back

    try {
      if (id) {
        await fetch(`${API_URL}/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
      } else {
        taskData.createdAt = new Date();
        await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Editar Tarea" : "Nueva Tarea"}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label htmlFor="completed" className="form-check-label">
            Completada
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Guardar cambios" : "Crear Tarea"}
        </button>
      </form>
    </div>
  );
}
export default TaskForm;
