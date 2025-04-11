import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;
  if (isEditing) {
    taskContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <input
          value={task.title}
          placeholder="Title"
          onChange={e => onChange({ ...task, title: e.target.value })}
        />
        <input
          value={task.text}
          placeholder="Task"
          onChange={e => onChange({ ...task, text: e.target.value })}
        />
        <input
          value={task.note}
          placeholder="Note"
          onChange={e => onChange({ ...task, note: e.target.value })}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </div>
    );
  } else {
    taskContent = (
      <div style={{ marginLeft: '10px' }}>
        <strong>{task.title}</strong><br />
        <span>{task.text}</span><br />
        <em>{task.note}</em><br />
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
  }

  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => onChange({ ...task, done: e.target.checked })}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
