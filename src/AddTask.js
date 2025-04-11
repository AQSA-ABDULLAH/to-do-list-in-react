import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [note, setNote] = useState('');

  function handleSubmit() {
    if (title.trim() && text.trim()) {
      onAddTask(title, text, note);
      setTitle('');
      setText('');
      setNote('');
    }
  }

  return (
    <div className="add-task-container">
      <input
        className="task-input"
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className="task-input"
        placeholder="Task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input
        className="task-input"
        placeholder="Note"
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <button className="add-button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}