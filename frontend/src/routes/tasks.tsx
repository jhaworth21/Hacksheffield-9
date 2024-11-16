import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import TaskCard from "../components/taskCard.tsx";
import Task from "../types/task.ts";

const Tasks = () => {

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

  return (
    <div className="tasks">
      <h1>Tasks</h1>

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
