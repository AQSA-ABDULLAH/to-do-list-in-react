import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import after jsPDF
import "./App.css";

// Default export the TaskApp component
export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(title, text, note) {
    dispatch({
      type: 'added',
      id: nextId++,
      title,
      text,
      note,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  function handleExportXLS() {
    const worksheet = XLSX.utils.json_to_sheet(tasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
    XLSX.writeFile(workbook, "TodoList.xlsx");
  }

  function handleExportPDF() {
    const doc = new jsPDF();
    doc.text("To Do List", 10, 10);
    doc.autoTable({
      head: [["ID", "Title", "Task", "Note", "Completed"]],
      body: tasks.map(t => [t.id, t.title, t.text, t.note, t.done ? "Yes" : "No"]),
    });
    doc.save("TodoList.pdf");
  }

  function handleShare() {
    const taskText = tasks.map(t => `- ${t.title}: ${t.text} [${t.done ? "Done" : "Pending"}]\nNote: ${t.note}`).join('\n\n');
    if (navigator.share) {
      navigator.share({
        title: 'My To Do List',
        text: taskText,
      }).catch(error => console.log('Sharing failed:', error));
    } else {
      alert("Share is not supported in this browser.");
    }
  }

  return (
    <>
      <h1>📝 TO DO LIST IN HOLIDAYS</h1>

      <AddTask onAddTask={handleAddTask} />

      <div className="export-buttons">
        <button onClick={handleExportXLS}>📄 Save as XLS</button>
        <button onClick={handleExportPDF}>📑 Save as PDF</button>
        <button onClick={handleShare}>📤 Share</button>
      </div>

      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        title: action.title,
        text: action.text,
        note: action.note,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, title: "Trip", text: 'Go to mountain', note: 'Take warm clothes', done: true },
  { id: 1, title: "Park", text: 'Visit the park', note: 'Don’t forget snacks', done: false },
  { id: 2, title: "Health", text: 'Drink water', note: '8 glasses minimum', done: false }
];

