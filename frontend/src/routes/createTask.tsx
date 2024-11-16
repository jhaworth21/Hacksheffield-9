import React, { useState } from 'react';
import backButtonImage from "../assets/back.svg";
import { useNavigate } from "react-router-dom";
import "./createTask.css";

const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const goBack = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const newTask = {
      title,
      description,
    };

    // TODO send new task to server

    // After saving, navigate back to the task list
    navigate('/');
  };

  return (
    <div className="createGoal">
      <button onClick={goBack} className="createTask__back_button">
        <img src={backButtonImage} alt="Back" className="createTask__back_button__image" />
      </button>
      <div className='createTask__main_content'>
        <h1 className="createTask__title">Create Goal</h1>

        <form onSubmit={handleSubmit}>
          <div  className="createTask__form_section">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Go to the gym"
              required
            />
          </div>
          <div className="createTask__form_section">
            <label htmlFor="description">Description of what a successful image will be of:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A photo of me in the gym, for example lifing weights or running on the treadmill"
              required
            />
          </div>
          <button type="submit" className="createTask__submit">Create goal 🔥</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
