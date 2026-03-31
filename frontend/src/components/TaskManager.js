import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskManager.css";

function TaskManager() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  // Add task
  const addTask = async () => {

    if (!title) {
      alert("Please enter a task");
      return;
    }

    await axios.post("http://localhost:5000/api/tasks", {
      title,
      status,
      dueDate
    });

    setTitle("");
    setStatus("Pending");
    setDueDate("");

    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  // Start edit
  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  // Update task
  const updateTask = async (id) => {

    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      title: editTitle
    });

    setEditId(null);
    fetchTasks();
  };

  const toggleComplete = async (task) => {

  const newStatus =
    task.status === "Completed" ? "Pending" : "Completed";

  await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
    status: newStatus
  });

  fetchTasks();

};
  useEffect(() => {
    fetchTasks();
  }, []);

  return (

    <div className="container">

      <h1>Task Manager</h1>

      {/* Input Section */}

      <div className="input-group">

        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addTask}>Add</button>

      </div>

      {/* Task List */}

      <div>

        {tasks.map((task) => (

          <div className="task-card" key={task._id}>

            {editId === task._id ? (

              <div>

                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <button onClick={() => updateTask(task._id)}>
                  Save
                </button>

              </div>

            ) : (

              <div style={{display:"flex", alignItems:"center", gap:"10px"}}>

<input
type="checkbox"
checked={task.status === "Completed"}
onChange={() => toggleComplete(task)}
/>

<h3
style={{
textDecoration:
task.status === "Completed" ? "line-through" : "none"
}}
>
{task.title}
</h3>

</div>

            )}

            <p>Status: {task.status}</p>

            <p>
              Due: {task.dueDate ? task.dueDate.substring(0,10) : "No date"}
            </p>

            <div className="task-actions">

              <button onClick={() => startEdit(task)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default TaskManager;