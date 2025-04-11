import { useState } from "react";

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field, value) => {
    onChange({
      ...task,
      [field]: value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <label
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "10px",
        marginBottom: "10px",
        width: "100%",
      }}
    >
      <div style={{
        display: "flex",
        gap: "10px",
      }}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => handleChange("done", e.target.checked)}
        style={{ marginTop: "5px" }}
      />

      {isEditing ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            flexGrow: 1,
          }}
        >
          <input
            type="text"
            value={task.title}
            placeholder="Title"
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <input
            type="text"
            value={task.text}
            placeholder="Task"
            onChange={(e) => handleChange("text", e.target.value)}
          />
          <input
            type="text"
            value={task.note}
            placeholder="Note"
            onChange={(e) => handleChange("note", e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <div className="task-details" style={{ flexGrow: 1 }}>
            <div className="task-title" style={{ fontWeight: "bold" }}>
              {task.title}
            </div>
            <div className="task-text">{task.text}</div>
            <div
              className="task-note"
              style={{ fontStyle: "italic", color: "#777" }}
            >
              {task.note}
            </div>
          </div>
        </div>
      )}
      </div>
      <div>
      <button onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </label>
  );
}
