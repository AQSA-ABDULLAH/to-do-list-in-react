import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';  // Ensure this is imported
import "./App.css";

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
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

    // Initialize autoTable on jsPDF instance
    doc.autoTable({
      head: [["ID", "Task", "Completed"]],
      body: tasks.map(t => [t.id, t.text, t.done ? "Yes" : "No"]),
    });

    doc.save("TodoList.pdf");
  }

  function handleShare() {
    const taskText = tasks.map(t => `- ${t.text} [${t.done ? "Done" : "Pending"}]`).join('\n');
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
        text: action.text,
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
  { id: 0, text: 'Go to mountain', done: true },
  { id: 1, text: 'Visit the park', done: false },
  { id: 2, text: 'Drink water', done: false }
];


