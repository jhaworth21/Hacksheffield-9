import React, {useMemo} from 'react';
import Task from "../types/task.ts";
import "./taskCard.css"
import flame from "../assets/flame.svg"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import loadingGif from "../assets/loading.gif";

type TaskCardProps = {
  task: Task;
}

const TaskCard = ({task}: TaskCardProps) => {
  const navigate = useNavigate();

  const hasCompletedToday = useMemo(() => {
    const currentDay = new Date().toISOString().split('T')[0];
    return task.lastCompleted === currentDay;
  }, [task.lastCompleted]);

  const currentStreak = useMemo(() => {
    // Returns the current streak if the task was completed today or yesterday.
    // Otherwise, returns 0.
    const currentDay = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if ([currentDay, yesterdayString].includes(task.lastCompleted)) {
      return task.streak;
    }

    return 0;
  }, [task.lastCompleted, task.streak]);

  const handleTaskCardClick = () => {
    // React router to /camera
    if (hasCompletedToday) {
      toast("You have already completed this task today!", {
        type: "error"
      })
      return;
    }

    if (task.pending) {
      toast("This task is currently being classified. Please wait.", {
        type: "error"
      })
      return;
    }

    navigate(`/camera/${task.id}`)
  }

  const handleModifyClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default anchor behavior
    e.stopPropagation(); // Prevent triggering the card's onClick handler
    navigate(`/edit-task/${task.id}`);
  };

  return (
    <div className={`taskCard ${hasCompletedToday ? '__completed' : ''}`}
         onClick={handleTaskCardClick}>
      <span>{task.title}</span>

      <div className="taskCard__actions">
        {task.pending && (
          <img
            src={loadingGif}
            alt="A little throbber"
            className="taskCard__actions__loading"
          />
        )}
        <img
          src={flame}
          alt="flame"
          className={`taskCard__actions__flame ${!hasCompletedToday ? 'taskCard__actions__flame--greyscale' : ''}`}
        />
        <span>{currentStreak}</span>
        <a
          href="#"
          onClick={handleModifyClick}
          className="taskCard__actions__modify"
        >
          Modify
        </a>

      </div>
    </div>
  );
};

export default TaskCard;
