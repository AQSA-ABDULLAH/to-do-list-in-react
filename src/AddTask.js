import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <div className="add-task-container">
      <input
        className="task-input"
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        className="add-button"
        onClick={() => {
          setText('');
          onAddTask(text);
        }}
      >
        Add
      </button>
    </div>
  );
}
