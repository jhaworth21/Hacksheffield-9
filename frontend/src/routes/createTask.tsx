import React, { useState } from 'react';
import backButtonImage from "../assets/back.svg";
import { useNavigate } from "react-router-dom";
import "./createTask.css";

const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const goBack = () => {
    navigate('/tasks');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const newTask = {
      title,
      description,
    };

    // TODO send new task to server

    // After saving, navigate back to the task list
    navigate('/tasks');
  };

  return (
    <div>
      <button onClick={goBack} className="createTask__back_button">
        <img src={backButtonImage} alt="Back" className="createTask__back_button__image" />
      </button>
      <h1>Create Goal</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
