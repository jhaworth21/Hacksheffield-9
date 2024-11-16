import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import TaskCard from "../components/taskCard.tsx";
import Task from "../types/task.ts";
import plusButton from "../assets/plus-icon.svg";
import "./tasks.css"
import {toast} from "react-toastify";

const Tasks = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO fetch tasks from the backend
    fetch("/api/tasks").then((response) => {
      return response.json();
    }).then((data) => {
      setTasks(data.map((task) => {
        return {
          id: task._id,
          title: task.title,
          description: task.description,
          streak: task.streakCount,
          lastCompleted: task.lastCompleted
        }
      }))

      setLoading(false)
    }).catch((error) => {
      toast("Failed to fetch tasks", {type: "error"})
      console.log(error)
    })
  }, []);

  const addTask = () => {
    navigate("/create-task")
  }

  return (
    <div className="tasks">

      <div className="tasks__title-bar">
        <h1>Goals</h1>

        <button className="tasks__title-bar__add-task" onClick={addTask}>
          <img src={plusButton} alt="Add goal" className="tasks__title-bar__add-task__image"/>
        </button>
      </div>


      <div className="tasks__tasks-wrapper">
        {
          loading && <p>Loading tasks...</p>
        }

        {!loading && tasks.map((task) => (
          <TaskCard key={task.id} task={task}/>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
