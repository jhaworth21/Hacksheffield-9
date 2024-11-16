import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import TaskCard from "../components/taskCard.tsx";
import Task from "../types/task.ts";
import "./tasks.css"

const Tasks = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // TODO fetch tasks from the backend
    setTasks([
      {
        id: "a",
        title: "Work on code",
        description: "Requires a photo of the code",
        streak: 3,
        lastCompleted: "2021-09-01"
      },
      {
        id: "b",
        title: "Study for math test",
        description: "Requires a photo of the math test",
        streak: 3,
        lastCompleted: "2024-11-16"
      }
    ])
  }, []);

  const addTask = () => {
    navigate("/create-task")
  }

  return (
    <div className="tasks">

      <div className="tasks__title-bar">
        <h1>Goals</h1>

        <button className="tasks__title-bar__add-task" onClick={addTask}>Add goal</button>
      </div>


      <div className="tasks__tasks-wrapper">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task}/>
        ))}
      </div>

      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default Tasks;
