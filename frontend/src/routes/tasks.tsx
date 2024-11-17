import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import TaskCard from "../components/taskCard.tsx";
import Task from "../types/task.ts";
import plusButton from "../assets/plus-icon.svg";
import logo from "../assets/logo.png"
import "./tasks.css"
import {toast, useToast} from "react-toastify";

const Tasks = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const updateTasks = useCallback(() => {
    fetch(`/api/tasks?t=${new Date().getTime()}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks((prevTasks) => {
          const newTasks = data.map((task) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            streak: task.streakCount,
            lastCompleted: task.lastCompleted,
            pending: task.pending,
          }));

          newTasks.forEach((newTask) => {
            const oldTask = prevTasks.find((task) => task.id === newTask.id);
            if (oldTask && oldTask.pending && !newTask.pending) {
              if (oldTask.lastCompleted !== newTask.lastCompleted) {
                setTimeout(() => {
                  toast(`Task ${newTask.title} completed!`, {type: "success"})
                })
              } else {
                setTimeout(() => {
                  toast(
                    `Task ${newTask.title} failed to complete. If you did complete it, please take another photo matching the description`,
                    {type: "error"}
                  )
                })
              }
            }
          });

          return newTasks;
        });

        setLoading(false);
      })
      .catch((error) => {
        toast("Failed to fetch tasks", {type: "error"});
        console.error(error);
      });
  }, []); // Add dependencies here if required.

  useEffect(() => {
    updateTasks();

    const interval = setInterval(() => {
      updateTasks();
    }, 5000);

    return () => {
      clearInterval(interval);
    }; // Cleanup function
  }, [updateTasks]); // Include updateTasks in dependencies.

  const addTask = () => {
    navigate("/create-task")
  }

  return (
    <div className="tasks">

      <div className="tasks__title-bar">
        <img src={logo} alt='Logo' className='tasks__title-bar__logo'></img>
        <h1>Make Me Study</h1>

        <button className="tasks__title-bar__add-task" onClick={addTask}>
          <img src={plusButton} alt="Add goal" className="tasks__title-bar__add-task__image"/>
        </button>
      </div>


      <div className="tasks__tasks-wrapper">
        <h2 className='tasks_task-wrapper__title'>Current Goals:</h2>
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