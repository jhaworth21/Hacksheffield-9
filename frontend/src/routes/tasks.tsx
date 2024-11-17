import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import TaskCard from "../components/taskCard.tsx";
import Task from "../types/task.ts";
import plusButton from "../assets/plus-icon.svg";
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
        lastCompleted: "2024-11-17"
      }
    ])
  }, []);

  const addTask = () => {
    navigate("/create-task")
  }

  return (
    <div className="tasks">

      <div className="tasks__title-bar">
        <h1>Make Me Study</h1>

        <button className="tasks__title-bar__add-task" onClick={addTask}>
          <img src={plusButton} alt="Add goal" className="tasks__title-bar__add-task__image"/>
        </button>
      </div>


      <div className="tasks__tasks-wrapper">
        <h2 className='tasks_task-wrapper__title'>Current Goals:</h2>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task}/>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
