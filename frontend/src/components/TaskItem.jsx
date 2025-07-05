import { Link } from "react-router-dom";

function TaskItem({ task, onDelete }) {
  const createdDate = new Date(task.createdAt).toLocaleDateString();

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{createdDate}</td>
      <td>
        {task.completed ? (
          <span className="badge bg-success">Completada</span>
        ) : (
          <span className="badge bg-warning text-dark">Pendiente</span>
        )}
      </td>
      <td>
        <Link
          to={`/edit/${task.id}`}
          className="btn btn-sm btn-outline-secondary me-2"
        >
          Editar
        </Link>
        <button
          onClick={() => onDelete(task.id)}
          className="btn btn-sm btn-outline-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
